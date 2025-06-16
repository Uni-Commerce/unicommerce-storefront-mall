import { Module } from '@nestjs/common'

import { OSSService } from '@/oss/oss.service'
import { PrismaModule } from '@/prisma/prisma.module'
import { BannerService } from './banner.service'
import { BannerController } from './banner.controller'

@Module({
  controllers: [BannerController],
  providers: [OSSService, BannerService],
  imports: [PrismaModule]
})
export class BannerModule {}
