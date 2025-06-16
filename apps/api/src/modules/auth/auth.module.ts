import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from '@/prisma/prisma.module'
import { MailerConfigService } from '@/mailer/mailer.service'
import { CustomMailerService } from '@/mailer/custom.service'
import { MailService } from '../mails/mails.service'
import { AdminService } from '../admin/admin.service'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtBackendStrategy } from '../jwt/jwt-auth.strategy'

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('NEST_APP_JWT_SECRET'),
        // e.g. 10s, 30m, 24h, 7d
        signOptions: { expiresIn: config.get('NEST_APP_JWT_EXPIRES') }
      }),
      inject: [ConfigService]
    }),
    PrismaModule
  ],
  providers: [
    AuthService,
    MailerConfigService,
    CustomMailerService,
    AdminService,
    JwtBackendStrategy,
    MailService
  ]
})
export class AuthModule {}
