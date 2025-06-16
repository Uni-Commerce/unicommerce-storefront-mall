import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator'
import { EmailType } from '@prisma/client'

export class CreateEmailTemplateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: EmailType

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  subject: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  @ApiProperty()
  from: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  context: string

  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  template: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  html: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  disabled: boolean
}
