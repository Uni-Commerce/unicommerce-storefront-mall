import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'
import { EmailLogService } from './email-log.service'
import { CreateEmailLogDto } from './dto/create-email-log.dto'
import { UpdateEmailLogDto } from './dto/update-email-log.dto'

@Auth()
@ApiTags('sys/email-log')
@Controller('sys/email-log')
export class EmailLogController {
  constructor(private readonly emailLogService: EmailLogService) {}

  @Post()
  create(@Body() createEmailLogDto: CreateEmailLogDto) {
    return this.emailLogService.create(createEmailLogDto)
  }

  @Get()
  findAll() {
    return this.emailLogService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emailLogService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateEmailLogDto: UpdateEmailLogDto) {
    return this.emailLogService.update(id, updateEmailLogDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emailLogService.remove(id)
  }
}
