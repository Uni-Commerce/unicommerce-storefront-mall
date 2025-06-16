import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsIn,
  IsOptional,
  Min,
  Max,
  MaxLength
} from 'class-validator'
import { $Enums } from '@prisma/client'

export class CreateEmailConfigDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  host: string

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(65535)
  @IsNotEmpty()
  @ApiProperty()
  port: number

  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  hostUser: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  @ApiProperty()
  hostPassword: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(55)
  @ApiProperty()
  from: string

  @IsString()
  @IsOptional()
  @IsIn(['ssl', 'tls'])
  @ApiProperty()
  protocol?: $Enums.SmtpProtocol

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  secure: boolean

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  preview: boolean
}
