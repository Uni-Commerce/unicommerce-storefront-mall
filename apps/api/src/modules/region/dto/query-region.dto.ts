import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class QueryRegionDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  code: string
}
