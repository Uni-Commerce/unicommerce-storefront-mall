import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { MailerConfigService } from '@/mailer/mailer.service'
import { CustomMailerService } from '@/mailer/custom.service'
import { MailController } from './mails.controller'

@Module({
  controllers: [MailController],
  imports: [PrismaModule],
  providers: [MailerConfigService, CustomMailerService]
})
export class MailModule {}
