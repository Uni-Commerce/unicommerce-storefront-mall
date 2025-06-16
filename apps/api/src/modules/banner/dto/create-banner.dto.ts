import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { Transform } from 'class-transformer'
import { TargetType } from '@prisma/client'

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  url: string

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  startDate: Date

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @ApiProperty()
  endDate: Date

  @IsString()
  @IsOptional()
  @ApiProperty()
  target: TargetType

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  status: string
}
