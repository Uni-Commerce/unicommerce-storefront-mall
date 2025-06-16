import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'
import { EmailConfigEntity } from './entities/email-config.entity'
import { EmailConfigService } from './email-config.service'
import { CreateEmailConfigDto } from './dto/create-email-config.dto'
import { UpdateEmailConfigDto } from './dto/update-email-config.dto'

@Auth()
@ApiTags('sys/email-config')
@Controller('sys/email-config')
export class EmailConfigController {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  @Post()
  create(@Body() createEmailConfigDto: CreateEmailConfigDto) {
    return this.emailConfigService.create(createEmailConfigDto)
  }

  @Post('connect')
  connect() {
    return this.emailConfigService.connect()
  }

  @Get('session')
  @ApiOkResponse({ type: EmailConfigEntity })
  async session() {
    const config = await this.emailConfigService.session()
    return new EmailConfigEntity(config)
  }

  @Get(':id')
  @ApiOkResponse({ type: EmailConfigEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const config = await this.emailConfigService.findOne(id)
    return new EmailConfigEntity(config)
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmailConfigDto: UpdateEmailConfigDto
  ) {
    return this.emailConfigService.update(id, updateEmailConfigDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmailConfigEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const config = await this.emailConfigService.remove(id)
    return new EmailConfigEntity(config)
  }
}
