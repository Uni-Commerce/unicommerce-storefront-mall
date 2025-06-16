import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateUserDto {
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

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  subscribed: boolean

  @IsString()
  @IsOptional()
  @ApiProperty()
  discription?: string
}
