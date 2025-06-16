import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { UrlKeyService } from './url-key.service'
import { UrlKeyController } from './url-key.controller'

@Module({
  controllers: [UrlKeyController],
  providers: [UrlKeyService],
  imports: [PrismaModule]
})
export class UrlKeyModule {}
