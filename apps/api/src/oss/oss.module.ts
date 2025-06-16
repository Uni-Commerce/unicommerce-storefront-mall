import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { OSSService } from './oss.service'

@Module({
  imports: [],
  providers: [ConfigService, OSSService],
  exports: [OSSService]
})
export class OSSModule {}
