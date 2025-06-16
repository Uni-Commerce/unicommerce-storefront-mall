import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ForgetPasswordDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  captcha_value: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  captcha_key: string
}
