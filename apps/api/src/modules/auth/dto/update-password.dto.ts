import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  newPassword: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  confirmPassword: string
}
