import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UpdatePhoneDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telephone: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  verificationCode: string
}
