import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { SystemLogService } from './system-log.service'
import { SystemLogController } from './system-log.controller'

@Module({
  controllers: [SystemLogController],
  providers: [SystemLogService],
  imports: [PrismaModule]
})
export class SystemLogModule {}
