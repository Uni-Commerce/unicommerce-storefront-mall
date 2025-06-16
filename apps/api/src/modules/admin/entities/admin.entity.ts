import { ApiProperty } from '@nestjs/swagger'
import { Admin, AdminRole } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class AdminEntity implements Admin {
  constructor(partial: Partial<AdminEntity>) {
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
  role: AdminRole

  @ApiProperty()
  disabled: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  lastLoginAt: Date

  @Exclude()
  password: string
}
