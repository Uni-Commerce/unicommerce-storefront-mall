import { ApiProperty } from '@nestjs/swagger'
import { $Enums, User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id: bigint

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  telephone: string

  @ApiProperty()
  disabled: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  authStatus: $Enums.AuthStatus

  @ApiProperty()
  subscribed: boolean

  @ApiProperty()
  discription: string

  @ApiProperty()
  lastLoginAt: Date

  @ApiProperty()
  profileAuth: boolean

  @ApiProperty()
  companyAuth: boolean

  @ApiProperty()
  storeAuth: boolean

  @ApiProperty()
  removed: boolean

  @ApiProperty()
  openid: string

  @Exclude()
  password: string
}
