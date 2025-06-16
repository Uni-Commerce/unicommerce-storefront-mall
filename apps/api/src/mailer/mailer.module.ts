import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerModule as MailerServerModule } from '@nestjs-modules/mailer'

import { PrismaModule } from '@/prisma/prisma.module'
import { PrismaService } from '@/prisma/prisma.service'
import { MailerConfigService } from './mailer.service'
import { CustomMailerService } from './custom.service'

@Module({
  imports: [
    MailerServerModule.forRootAsync({
      imports: [PrismaModule],
      inject: [ConfigService, PrismaService],
      useClass: MailerConfigService
    })
  ],
  providers: [PrismaService, MailerConfigService, CustomMailerService],
  exports: [CustomMailerService]
})
export class MailerModule {}
