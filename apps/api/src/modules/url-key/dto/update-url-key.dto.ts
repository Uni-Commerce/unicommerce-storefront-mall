import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsOptional } from 'class-validator'
import { $Enums } from '@prisma/client'

export class UpdateUrlKeyDto {
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
