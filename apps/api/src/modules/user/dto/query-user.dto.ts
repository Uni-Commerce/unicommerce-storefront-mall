import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class QueryUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(55)
  @ApiProperty()
  name: string

  @IsString()
  @MaxLength(55)
  @IsOptional()
  @ApiProperty()
  email: string
}
