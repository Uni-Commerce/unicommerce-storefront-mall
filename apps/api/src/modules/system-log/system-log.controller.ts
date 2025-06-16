import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'
import { SystemLogService } from './system-log.service'
import { CreateSystemLogDto } from './dto/create-system-log.dto'
import { UpdateSystemLogDto } from './dto/update-system-log.dto'

@Auth()
@ApiTags('sys/system-log')
@Controller('sys/system-log')
export class SystemLogController {
  constructor(private readonly systemLogService: SystemLogService) {}

  @Post()
  create(@Body() createSystemLogDto: CreateSystemLogDto) {
    return this.systemLogService.create(createSystemLogDto)
  }

  @Get()
  findAll() {
    return this.systemLogService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.systemLogService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSystemLogDto: UpdateSystemLogDto) {
    return this.systemLogService.update(id, updateSystemLogDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.systemLogService.remove(id)
  }
}
