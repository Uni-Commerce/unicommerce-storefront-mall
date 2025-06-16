import { ApiProperty } from '@nestjs/swagger'
import { IsIP, IsNotEmpty, IsJSON, IsString, IsOptional, MaxLength } from 'class-validator'

export class CreateApiLoggerDto {
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
  @MaxLength(55)
  @ApiProperty()
  method: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  url: string

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  body: string

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  params: string

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  query: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  time: string
}
