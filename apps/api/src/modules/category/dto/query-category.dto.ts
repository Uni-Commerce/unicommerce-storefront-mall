import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'

export class QueryCategoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  urlKey: string
}
