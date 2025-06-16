import { ApiProperty } from '@nestjs/swagger'
import { $Enums, User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @Exclude()
  id: bigint

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  telephone: string

  @Exclude()
  disabled: boolean

  @ApiProperty()
  createdAt: Date

  @Exclude()
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

  @Exclude()
  password: string

  @Exclude()
  removed: boolean

  @Exclude()
  openid: string
}
