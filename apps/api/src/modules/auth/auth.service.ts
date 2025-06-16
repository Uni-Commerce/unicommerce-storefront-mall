import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { I18nService } from 'nestjs-i18n'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '@/prisma/prisma.service'
import { AuthEntity } from './entity/auth.entity'
import { UpdatePasswordDto } from './dto/update-password.dto'

const errorMap = {
  TokenExpiredError: 'Refresh token expired',
  JsonWebTokenError: 'Invalid refresh token',
  NotBeforeError: 'Refresh token not active',
  default: 'unknown error'
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string, params: any): Promise<AuthEntity> {
    const admin = await this.prisma.admin.findFirst({
      where: {
        email
      }
    })

    if (!admin) {
      throw new NotFoundException(
        this.i18n.t('user.notFound', {
          args: {
            email
          }
        })
      )
    }

    if (admin.disabled) {
      throw new NotFoundException('User account is locked, please contact admin.')
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      throw new NotFoundException(this.i18n.t('user.invalidPassword'))
    }

    await this.prisma.admin.update({
      where: {
        id: admin.id
      },
      data: {
        lastLoginAt: new Date()
      }
    })
    await this.prisma.systemLog.create({
      data: {
        ...params,
        adminId: admin.id
      }
    })
    const accessToken: string = this.jwtService.sign({ adminId: admin.id })
    const refreshToken: string = this.jwtService.sign(
      { adminId: admin.id },
      {
        secret: this.configService.get<string>('NEST_APP_JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('NEST_APP_JWT_REFRESH_EXPIRES')
      }
    )

    return {
      accessToken,
      refreshToken
    }
  }

  async refresh(refresh: string, params: any): Promise<AuthEntity> {
    try {
      const payload = this.jwtService.verify(refresh, {
        secret: this.configService.get<string>('NEST_APP_JWT_REFRESH_SECRET')
      })
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: payload.adminId
        }
      })
      await this.prisma.systemLog.create({
        data: {
          ...params,
          adminId: admin.id
        }
      })
      const accessToken: string = this.jwtService.sign({ adminId: admin.id })
      const refreshToken: string = this.jwtService.sign(
        { adminId: admin.id },
        {
          secret: this.configService.get<string>('NEST_APP_JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('NEST_APP_JWT_REFRESH_EXPIRES')
        }
      )
      return {
        accessToken,
        refreshToken
      }
    } catch (error: any) {
      if (!error || typeof error !== 'object') {
        throw new UnauthorizedException('Error object is missing or invalid')
      }

      const errorName = error.name || 'default'
      const errorMessage = errorMap[errorName]
      throw new UnauthorizedException(errorMessage)
    }
  }

  async session(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: payload.adminId
        }
      })

      if (!admin) {
        throw new UnauthorizedException(`Token is invalid: ${token}`)
      }

      return {
        admin
      }
    } catch (error: any) {
      if (!error || typeof error !== 'object') {
        throw new UnauthorizedException('Error object is missing or invalid')
      }
    }
  }

  async password(updatePasswordDto: UpdatePasswordDto, admin: any) {
    const { password, newPassword, confirmPassword } = updatePasswordDto

    const exsistUser = await this.prisma.admin.findUnique({ where: { id: admin.id } })
    const isPasswordValid: boolean = await bcrypt.compare(password, exsistUser.password)
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password')
    }

    if (password === newPassword) {
      throw new BadRequestException('New password cannot be the same as the old password')
    }
    if (confirmPassword !== newPassword) {
      throw new BadRequestException('New password and confirm password do not match')
    }

    const hash: number = 10
    const encryptNewPassword: string = await bcrypt.hash(newPassword, hash)
    const adminData = await this.prisma.admin.update({
      where: {
        id: exsistUser.id
      },
      data: {
        password: encryptNewPassword
      }
    })
    const accessToken: string = this.jwtService.sign({ adminId: adminData.id })
    const refreshToken: string = this.jwtService.sign(
      { adminId: admin.id },
      {
        secret: this.configService.get<string>('NEST_APP_JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('NEST_APP_JWT_REFRESH_EXPIRES')
      }
    )

    return {
      accessToken,
      refreshToken
    }
  }
}
