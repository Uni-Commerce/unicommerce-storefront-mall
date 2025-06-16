import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { GetUser } from '@/decorators/user.decorator'
import { StoreAuth } from '@/decorators/storeAuth.decorator'
import { StoreUserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdatePhoneDto } from './dto/update-phone.dto'
import { PhoneDto } from './dto/phone.dto'
import { UserEntity } from '../auth/entities/user.entity'

@ApiTags('storefront/user')
@Controller('storefront/user')
export class StoreUserController {
  constructor(private readonly userService: StoreUserService) {}

  @Post()
  @StoreAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(@GetUser() user, @Req() req: any, @Body() data: UpdateUserDto) {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]

    if (!user) {
      throw new UnauthorizedException(`Token is invalid: ${token}`)
    }
    const update = await this.userService.update(user, data)
    return new UserEntity(update)
  }

  @Post('password')
  @StoreAuth()
  @ApiOkResponse({ type: UserEntity })
  async modifyPassword(@GetUser() user, @Body() data: UpdatePasswordDto) {
    const update = await this.userService.modifyPassword(user, data)
    return new UserEntity(update)
  }

  @Post('phone/sms')
  async requsetRegisterCode(@Body() data: PhoneDto) {
    const success = await this.userService.requsetPhoneCode(data)
    return { success }
  }

  @Post('phone')
  @StoreAuth()
  @ApiOkResponse({ type: UserEntity })
  async modifyPhone(@GetUser() user, @Body() data: UpdatePhoneDto) {
    const update = await this.userService.modifyPhone(user, data)
    return new UserEntity(update)
  }
}
