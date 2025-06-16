import { ApiProperty } from '@nestjs/swagger'
import { EmailConfig, $Enums } from '@prisma/client'

export class EmailConfigEntity implements EmailConfig {
  constructor(partial: Partial<EmailConfigEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty()
  id: bigint

  @ApiProperty()
  host: string

  @ApiProperty()
  port: number

  @ApiProperty()
  hostUser: string

  @ApiProperty()
  from: string

  @ApiProperty()
  protocol: $Enums.SmtpProtocol

  @ApiProperty()
  secure: boolean

  @ApiProperty()
  preview: boolean

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  hostPassword: string
}
