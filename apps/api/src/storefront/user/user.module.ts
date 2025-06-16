import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { RedisModule } from '@/redis/redis.module'
import { SmsModule } from '@/sms/sms.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { StoreUserService } from './user.service'
import { StoreUserController } from './user.controller'

@Module({
  controllers: [StoreUserController],
  imports: [PassportModule, RedisModule, SmsModule, PrismaModule],
  providers: [StoreUserService]
})
export class StoreUserModule {}
