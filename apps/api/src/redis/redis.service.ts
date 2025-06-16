import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
  private readonly redisClient: Redis

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get<string>('NEST_APP_REDIS_HOST', 'localhost'),
      port: Number(this.configService.get<number>('NEST_APP_REDIS_PORT', 6379)),
      password: this.configService.get<string>('NEST_APP_REDIS_PASSWORD', 'blogs_redis'),
      db: Number(this.configService.get<number>('NEST_APP_REDIS_DB', 0))
    })
  }

  getClient(): Redis {
    return this.redisClient
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redisClient.set(key, value, 'EX', ttl)
    } else {
      await this.redisClient.set(key, value)
    }
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key)
  }

  async del(key: string): Promise<number> {
    return this.redisClient.del(key)
  }

  async exists(key: string): Promise<number> {
    return this.redisClient.exists(key)
  }

  async ttl(key: string): Promise<number> {
    return this.redisClient.ttl(key)
  }

  async keys(pattern: string = '*'): Promise<string[]> {
    return this.redisClient.keys(pattern)
  }
}
