import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PrismaModule } from '@/prisma/prisma.module'
import { MailerConfigService } from '@/mailer/mailer.service'
import { CustomMailerService } from '@/mailer/custom.service'
import { MailService } from '../mails/mails.service'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  imports: [PrismaModule, AuthModule],
  providers: [
    JwtService,
    MailerConfigService,
    CustomMailerService,
    UserService,
    AuthService,
    MailService
  ]
})
export class UserModule {}
