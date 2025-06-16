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

export class CreateUserDto {
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

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  disabled: boolean

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  subscribed: boolean

  @IsString()
  @IsOptional()
  discription?: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string
}
