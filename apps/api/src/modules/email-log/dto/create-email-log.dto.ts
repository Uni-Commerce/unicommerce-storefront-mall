import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { EmailType } from '@prisma/client'

export class CreateEmailLogDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  type: EmailType

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  to: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  from: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  subject: string
}
