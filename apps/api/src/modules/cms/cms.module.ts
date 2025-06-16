import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { CmsService } from './cms.service'
import { CmsController } from './cms.controller'

@Module({
  controllers: [CmsController],
  providers: [CmsService],
  imports: [PrismaModule]
})
export class CmsModule {}
