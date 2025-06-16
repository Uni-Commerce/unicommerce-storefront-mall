import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'
import { EmailTemplateService } from './email-template.service'
import { CreateEmailTemplateDto } from './dto/create-email-template.dto'
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto'

@Auth()
@ApiTags('sys/email-template')
@Controller('sys/email-template')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  create(@Body() createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.emailTemplateService.create(createEmailTemplateDto)
  }

  @Get()
  findAll() {
    return this.emailTemplateService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emailTemplateService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmailTemplateDto: UpdateEmailTemplateDto
  ) {
    return this.emailTemplateService.update(id, updateEmailTemplateDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emailTemplateService.remove(id)
  }
}
