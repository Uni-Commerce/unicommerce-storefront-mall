import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { ApiLoggerService } from './api-logger.service'
import { ApiLoggerController } from './api-logger.controller'

@Module({
  controllers: [ApiLoggerController],
  providers: [ApiLoggerService],
  imports: [PrismaModule]
})
export class ApiLoggerModule {}
