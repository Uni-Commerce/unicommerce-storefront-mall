import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator'

export class AuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telephone: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(6)
  password: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(6)
  verificationCode: string
}
