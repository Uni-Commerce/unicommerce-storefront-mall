import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator'
import { $Enums } from '@prisma/client'

export class CreateUrlKeyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  url: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: $Enums.UrlKeyType

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  typeId: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  redirectUrl?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  redirectType?: $Enums.RedirectType

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  disabled: boolean
}
