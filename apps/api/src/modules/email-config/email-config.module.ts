import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'
import { MailerConfigService } from '@/mailer/mailer.service'
import { CustomMailerService } from '@/mailer/custom.service'
import { MailService } from '../mails/mails.service'
import { EmailConfigService } from './email-config.service'
import { EmailConfigController } from './email-config.controller'

@Module({
  controllers: [EmailConfigController],
  imports: [PrismaModule],
  providers: [EmailConfigService, MailService, MailerConfigService, CustomMailerService]
})
export class EmailConfigModule {}
