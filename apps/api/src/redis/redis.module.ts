import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis'

import { RedisService } from './redis.service'
import { RedisController } from './redis.controller'

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('NEST_APP_REDIS_HOST', 'localhost')
        const port = configService.get<number>('NEST_APP_REDIS_PORT', 6379)
        const password = configService.get<string>('NEST_APP_REDIS_PASSWORD', 'blogs_redis')
        const db = configService.get<number>('NEST_APP_REDIS_DB', 0)

        return {
          type: 'single', // or 'cluster' if you're using Redis Cluster
          url: `redis://${host}:${port}`,
          options: {
            password,
            db
          }
        }
      }
    })
  ],
  providers: [RedisService],
  controllers: [RedisController],
  exports: [RedisService]
})
export class RedisModule {}
