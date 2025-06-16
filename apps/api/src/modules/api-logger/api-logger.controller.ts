import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'
import { ApiLoggerService } from './api-logger.service'
import { CreateApiLoggerDto } from './dto/create-api-logger.dto'

@ApiTags('sys/api-logger')
@Auth('ADMIN', 'SYSTEM')
@Controller('sys/api-logger')
export class ApiLoggerController {
  constructor(private readonly apiLoggerService: ApiLoggerService) {}

  @Post()
  create(@Body() createApiLoggerDto: CreateApiLoggerDto) {
    return this.apiLoggerService.create(createApiLoggerDto)
  }

  @Get()
  findAll() {
    return this.apiLoggerService.findAll()
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.apiLoggerService.remove(id)
  }
}
