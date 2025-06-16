import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  urlKey: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  level: string

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty()
  image?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status: string

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

  @IsString()
  @IsOptional()
  @ApiProperty()
  parentId?: string
}
