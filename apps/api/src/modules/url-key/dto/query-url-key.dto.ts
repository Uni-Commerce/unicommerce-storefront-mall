import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, MaxLength } from 'class-validator'
import { $Enums } from '@prisma/client'

export class QueryUrlKeyDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  @ApiProperty()
  url: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  type: $Enums.UrlKeyType
}
