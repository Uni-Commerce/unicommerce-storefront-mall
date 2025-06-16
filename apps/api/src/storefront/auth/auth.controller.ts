import { Controller, Get, Post, Body, Req, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { isEmpty } from 'lodash'

import { GetUser } from '@/decorators/user.decorator'
import { UserEntity } from './entities/user.entity'
import { JwtStorefrontAuthGuard } from '../jwt/jwt-auth.guard'
import { StoreAuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RegisterDto } from './dto/register.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { PhoneDto } from './dto/phone.dto'
import { RegisterEntity } from './entities/register.entity'

@ApiTags('storefront/auth')
@Controller('storefront/auth')
export class StoreAuthController {
  constructor(private readonly authService: StoreAuthService) {}

  @Post('register/sms')
  async requsetRegisterCode(@Body() data: PhoneDto) {
    const success = await this.authService.requsetRegisterCode(data)
    return { success }
  }

  @Post('register')
  @ApiOkResponse({ type: RegisterEntity })
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.register(data)
    return new RegisterEntity(user)
  }

  @Post('token/sms')
  async requsetLoginCode(@Body() data: PhoneDto) {
    const success = await this.authService.requsetLoginCode(data)
    return { success }
  }

  @Post('token')
  @ApiOkResponse({ type: UserEntity })
  login(@Body() data: AuthDto) {
    return this.authService.login(data)
  }

  @Post('password/sms')
  async requsetPasswordCode(@Body() data: PhoneDto) {
    const success = await this.authService.requsetPasswordCode(data)
    return { success }
  }

  @Post('reset-password')
  resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPassword(data)
  }

  @Get('session')
  @UseGuards(JwtStorefrontAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  async session(@GetUser() user, @Req() req: any) {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    if (!user) {
      throw new UnauthorizedException(`Token is invalid: ${token}`)
    }
    const wechatAuth = !isEmpty(user?.openid)
    const formatUser = new UserEntity(user)
    return {
      ...formatUser,
      wechatAuth
    }
  }
}
