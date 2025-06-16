import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { StoreCmsService } from './cms.service'
import { StoreCmsController } from './cms.controller'

@Module({
  controllers: [StoreCmsController],
  providers: [StoreCmsService],
  imports: [PrismaModule]
})
export class StoreCmsModule {}
