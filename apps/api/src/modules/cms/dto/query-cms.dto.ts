import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'

export class QueryCmsDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  url: string

  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  title: string
}
