import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class PhoneDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telephone: string
}
