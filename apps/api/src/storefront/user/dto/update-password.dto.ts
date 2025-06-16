import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  password: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  newPassword: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  confirmPassword: string
}
