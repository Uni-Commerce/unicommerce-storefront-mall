import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationParams } from '@/decorators/pagination.decorator'
import { Auth } from '@/decorators/auth.decorator'
import { CmsService } from './cms.service'
import { CreateCmDto } from './dto/create-cm.dto'
import { UpdateCmDto } from './dto/update-cm.dto'
import { QueryCmsDto } from './dto/query-cms.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Auth()
@ApiTags('sys/cms')
@Controller('sys/cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post()
  create(@Body() createCmDto: CreateCmDto) {
    return this.cmsService.create(createCmDto)
  }

  @Get()
  findAll(@PaginationParams() pagination: Pagination, @Query() query: QueryCmsDto) {
    return this.cmsService.findAll(pagination, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCmDto: UpdateCmDto) {
    return this.cmsService.update(id, updateCmDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.remove(id)
  }
}
