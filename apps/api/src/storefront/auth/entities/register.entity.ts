import { ApiProperty } from '@nestjs/swagger'
import { $Enums, User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class RegisterEntity implements User {
  constructor(partial: Partial<RegisterEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  telephone: string

  @Exclude()
  id: bigint

  @ApiProperty()
  createdAt: Date

  @Exclude()
  disabled: boolean

  @Exclude()
  updatedAt: Date

  @Exclude()
  lastLoginAt: Date

  @Exclude()
  authStatus: $Enums.AuthStatus

  @ApiProperty()
  subscribed: boolean

  @ApiProperty()
  discription: string

  @Exclude()
  profileAuth: boolean

  @Exclude()
  companyAuth: boolean

  @Exclude()
  storeAuth: boolean

  @Exclude()
  password: string

  @Exclude()
  removed: boolean

  @Exclude()
  openid: string
}
