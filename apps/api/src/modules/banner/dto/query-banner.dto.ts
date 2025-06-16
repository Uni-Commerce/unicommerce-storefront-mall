import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class QueryBannerDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  url: string
}
