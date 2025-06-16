import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { EmailLogService } from './email-log.service'
import { EmailLogController } from './email-log.controller'

@Module({
  controllers: [EmailLogController],
  providers: [EmailLogService],
  imports: [PrismaModule]
})
export class EmailLogModule {}
