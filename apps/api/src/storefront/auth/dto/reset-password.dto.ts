import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telephone: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  verificationCode: string
}
