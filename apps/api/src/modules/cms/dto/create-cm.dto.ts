import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator'

export class CreateCmDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  url: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  title: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  disabled: boolean

  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  metaTitle?: string

  @IsString()
  @IsOptional()
  @MaxLength(200)
  @ApiProperty()
  metaKeywords?: string

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty()
  metaDescription?: string
}
