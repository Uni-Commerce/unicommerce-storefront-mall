import { ApiProperty } from '@nestjs/swagger'
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength
} from 'class-validator'
import { AdminRole } from '@prisma/client'

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  name: string

  @IsString()
  @MaxLength(55)
  @IsEmail()
  @ApiProperty()
  email: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  telephone: string

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: AdminRole

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  disabled: boolean

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string
}
