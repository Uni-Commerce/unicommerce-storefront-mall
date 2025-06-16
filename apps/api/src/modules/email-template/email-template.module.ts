import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { EmailTemplateService } from './email-template.service'
import { EmailTemplateController } from './email-template.controller'

@Module({
  controllers: [EmailTemplateController],
  imports: [PrismaModule],
  providers: [EmailTemplateService]
})
export class EmailTemplateModule {}
