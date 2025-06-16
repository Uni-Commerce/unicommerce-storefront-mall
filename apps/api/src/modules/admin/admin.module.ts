import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaModule } from '@/prisma/prisma.module'
import { MailerConfigService } from '@/mailer/mailer.service'
import { CustomMailerService } from '@/mailer/custom.service'
import { MailService } from '../mails/mails.service'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { AdminService } from './admin.service'
import { AdminController } from './admin.controller'

@Module({
  controllers: [AdminController],
  imports: [PrismaModule, AuthModule],
  providers: [
    JwtService,
    MailerConfigService,
    CustomMailerService,
    AdminService,
    AuthService,
    MailService
  ]
})
export class AdminModule {}
