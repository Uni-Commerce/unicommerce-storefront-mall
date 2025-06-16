import {
  Controller,
  Body,
  Post,
  Req,
  Get,
  BadRequestException,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'

import { GetUser } from '@/decorators/user.decorator'
import { JwtBackendAuthGuard } from '../jwt/jwt-auth.guard'
import { AuthEntity } from './entity/auth.entity'
import { AuthDto } from './dto/auth.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { AuthService } from './auth.service'
import { AdminEntity } from '../admin/entities/admin.entity'

@ApiTags('sys/auth')
@Controller('sys/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: AuthDto, @Req() req: any) {
    return this.authService.login(email, password, {
      ip: req.ip,
      url: req.originalUrl,
      userAgent: req?.headers?.['user-agent'] ?? ''
    })
  }

  @Post('refresh')
  async refresh(@Req() req: any) {
    const { authorization } = req.headers
    const refreshToken = authorization.split(' ')[1]

    if (!refreshToken) {
      throw new BadRequestException('Refresh token not found')
    }

    return this.authService.refresh(refreshToken, {
      ip: req.ip,
      url: req.originalUrl,
      userAgent: req?.headers?.['user-agent'] ?? ''
    })
  }

  @Post('password')
  @UseGuards(JwtBackendAuthGuard)
  async password(@Body() updatePasswordDto: UpdatePasswordDto, @GetUser() admin: any) {
    const result = await this.authService.password(updatePasswordDto, admin)
    return result
  }

  @Get('session')
  @UseGuards(JwtBackendAuthGuard, ThrottlerGuard)
  @ApiOkResponse({ type: AdminEntity })
  async session(@GetUser() admin, @Req() req: any) {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    if (!admin) {
      throw new UnauthorizedException(`Token is invalid: ${token}`)
    }

    return new AdminEntity(admin)
  }
}
