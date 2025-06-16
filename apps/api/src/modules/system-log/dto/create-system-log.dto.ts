import { ApiProperty } from '@nestjs/swagger'
import { IsIP, IsNotEmpty, IsString, IsOptional, MaxLength, IsNumber } from 'class-validator'

export class CreateSystemLogDto {
  @IsIP()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  ip: string

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  userAgent: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  url: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  region: string

  @IsNumber()
  @ApiProperty()
  adminId: bigint
}
