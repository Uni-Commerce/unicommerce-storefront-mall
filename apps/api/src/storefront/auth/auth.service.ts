import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { I18nService } from 'nestjs-i18n'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '@/prisma/prisma.service'
import { RedisService } from '@/redis/redis.service'
import { SmsService } from '@/sms/sms.service'
import { AuthEntity } from './entities/auth.entity'
import { AuthDto } from './dto/auth.dto'
import { RegisterDto } from './dto/register.dto'
import { PhoneDto } from './dto/phone.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Injectable()
export class StoreAuthService {
  private readonly VERIFICATION_CODE_EXPIRE = 300 // 5分钟

  constructor(
    private readonly i18n: I18nService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly smsService: SmsService
  ) {}

  async requsetSmsCode(type: string, telephone: string, templateCode: string): Promise<boolean> {
    // 检查发送频率
    const lastSentKey = `${type}:${telephone}:last_sent`
    const lastSent = await this.redisService.get(lastSentKey)

    if (lastSent && Date.now() - parseInt(lastSent) < 60000) {
      throw new BadRequestException('请求过于频繁，请稍后再试')
    }

    // 生成验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // 发送短信
    const sent = await this.smsService.sendVerificationCode(telephone, code, templateCode)
    if (!sent) {
      throw false
    }

    // 存储验证码和发送时间
    await Promise.all([
      this.redisService.set(`${type}:${telephone}`, code, this.VERIFICATION_CODE_EXPIRE),
      this.redisService.set(lastSentKey, Date.now().toString(), 60) // 1分钟冷却
    ])
    return true
  }

  async verifySmsCode(type: string, telephone: string, code: string): Promise<boolean> {
    const storedCode = await this.redisService.get(`${type}:${telephone}`)
    return storedCode === code
  }

  async requsetLoginCode(data: PhoneDto): Promise<boolean> {
    const { telephone } = data
    const exsistUser = await this.prisma.user.findFirst({
      where: {
        telephone: telephone
      }
    })
    if (!exsistUser || exsistUser.removed) {
      throw new NotFoundException(
        this.i18n.t('user.notExsistAccount', {
          args: {
            telephone: telephone
          }
        })
      )
    }
    const result = await this.requsetSmsCode('login', telephone, 'SMS_486600040')
    return result
  }

  async loginWithPassword(telephone: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        telephone
      }
    })

    if (!user || user.removed) {
      throw new NotFoundException(
        this.i18n.t('user.notFound', {
          args: {
            telephone
          }
        })
      )
    }

    if (user.disabled) {
      throw new NotFoundException(this.i18n.t('user.locked'))
    }

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new NotFoundException(this.i18n.t('user.invalidPassword'))
    }

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        lastLoginAt: new Date()
      }
    })
    const accessToken: string = this.jwtService.sign({ userId: user.id })
    return accessToken
  }

  async loginWithSmsCode(telephone: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        telephone
      }
    })

    if (!user || user.removed) {
      throw new NotFoundException(
        this.i18n.t('user.notFound', {
          args: {
            telephone
          }
        })
      )
    }

    if (user.disabled) {
      throw new NotFoundException(this.i18n.t('user.locked'))
    }
    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        lastLoginAt: new Date()
      }
    })
    const accessToken: string = this.jwtService.sign({ userId: user.id })
    return accessToken
  }

  async login(data: AuthDto): Promise<AuthEntity> {
    const { telephone, password, verificationCode } = data

    if (verificationCode) {
      // 验证验证码
      const isValid = await this.verifySmsCode('login', telephone, verificationCode)
      if (!isValid) {
        throw new BadRequestException('验证码无效或已过期')
      } else {
        const accessToken = await this.loginWithSmsCode(telephone)
        return {
          accessToken
        }
      }
    } else {
      const accessToken = await this.loginWithPassword(telephone, password)
      return {
        accessToken
      }
    }
  }

  async requsetRegisterCode(data: PhoneDto): Promise<boolean> {
    const { telephone } = data
    const exsistUser = await this.prisma.user.findFirst({
      where: {
        telephone: telephone
      }
    })
    if (exsistUser) {
      throw new NotFoundException(
        this.i18n.t('user.telephoneExisted', {
          args: {
            telephone: telephone
          }
        })
      )
    }
    const result = await this.requsetSmsCode('register', telephone, 'SMS_486485034')
    return result
  }

  async register(registerDto: RegisterDto) {
    const { verificationCode, telephone, ...restDto } = registerDto
    // 验证验证码
    const isValid = await this.verifySmsCode('register', telephone, verificationCode)
    if (!isValid) {
      throw new BadRequestException('验证码无效或已过期')
    }

    const exsistUser = await this.prisma.user.findFirst({
      where: {
        telephone: telephone
      }
    })
    if (exsistUser) {
      throw new NotFoundException(
        this.i18n.t('user.telephoneExisted', {
          args: {
            telephone: telephone
          }
        })
      )
    }
    const hash: number = 10
    const password = await bcrypt.hash(registerDto.password, hash)
    const user = await this.prisma.user.create({
      data: {
        ...restDto,
        email: '',
        telephone,
        name: registerDto.name,
        password
      }
    })
    // 清除验证码
    await this.redisService.del(`register:${telephone}`)
    return user
  }

  async requsetPasswordCode(data: PhoneDto): Promise<boolean> {
    const { telephone } = data
    const exsistUser = await this.prisma.user.findFirst({
      where: {
        telephone: telephone
      }
    })
    if (!exsistUser) {
      throw new NotFoundException(
        this.i18n.t('user.notExsistAccount', {
          args: {
            telephone: telephone
          }
        })
      )
    }
    const result = await this.requsetSmsCode('password', telephone, 'SMS_486530039')
    return result
  }

  async resetPassword(data: ResetPasswordDto) {
    // 验证验证码
    const isValid = await this.verifySmsCode('password', data.telephone, data.verificationCode)
    if (!isValid) {
      throw new BadRequestException('验证码无效或已过期')
    }

    const user = await this.prisma.user.findFirst({
      where: {
        telephone: data.telephone
      }
    })
    if (!user) {
      throw new NotFoundException(this.i18n.t('user.notExsist'))
    }

    const isPasswordValid: boolean = await bcrypt.compare(data.password, user.password)
    if (isPasswordValid) {
      throw new BadRequestException(this.i18n.t('user.samePassword'))
    }

    if (data.confirmPassword !== data.password) {
      throw new BadRequestException(this.i18n.t('user.confirmPassword'))
    }

    const hash: number = 10
    const newPassword: string = await bcrypt.hash(data.password, hash)
    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: newPassword
      }
    })
    return {
      success: true
    }
  }
}
