import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'
import { RedisService } from './redis.service'

@Auth()
@ApiTags('core/redis')
@Controller('core/redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @ApiOperation({ summary: '设置缓存值' })
  @Get('set')
  async set(@Query('key') key: string, @Query('value') value: string, @Query('ttl') ttl?: number) {
    await this.redisService.set(key, value, ttl)
    return { success: true }
  }

  @ApiOperation({ summary: '获取缓存值' })
  @Get('get')
  async get(@Query('key') key: string) {
    const value = await this.redisService.get(key)
    return { key, value }
  }

  @ApiOperation({ summary: '获取所有缓存值' })
  @Get('keys')
  async keys() {
    const values = await this.redisService.keys()
    return values
  }

  @ApiOperation({ summary: '删除缓存' })
  @Get('del')
  async del(@Query('key') key: string) {
    const result = await this.redisService.del(key)
    return { success: result > 0 }
  }

  @ApiOperation({ summary: '检查键是否存在' })
  @Get('exists')
  async exists(@Query('key') key: string) {
    const exists = await this.redisService.exists(key)
    return { exists: exists === 1 }
  }

  @ApiOperation({ summary: '获取剩余过期时间' })
  @Get('ttl')
  async ttl(@Query('key') key: string) {
    const ttl = await this.redisService.ttl(key)
    return { ttl }
  }
}
