import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { StoreRegionService } from './region.service'
import { StoreRegionController } from './region.controller'

@Module({
  controllers: [StoreRegionController],
  providers: [StoreRegionService],
  imports: [PrismaModule]
})
export class StoreRegionModule {}
