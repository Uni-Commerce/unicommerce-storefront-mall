import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { PrismaModule } from '@/prisma/prisma.module'
import { RedisModule } from '@/redis/redis.module'
import { SmsModule } from '@/sms/sms.module'
import { StoreAuthService } from './auth.service'
import { StoreAuthController } from './auth.controller'
import { JwtStorefrontStrategy } from '../jwt/jwt-auth.strategy'

@Module({
  controllers: [StoreAuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('NEST_APP_JWT_STOREFRONT_SECRET'),
        // e.g. 10s, 30m, 24h, 7d
        signOptions: { expiresIn: config.get('NEST_APP_JWT_STOREFRONT_EXPIRES') }
      }),
      inject: [ConfigService]
    }),
    PrismaModule,
    RedisModule,
    SmsModule
  ],
  providers: [JwtStorefrontStrategy, StoreAuthService]
})
export class StoreAuthModule {}
