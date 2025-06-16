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
import { UrlKeyService } from './url-key.service'
import { CreateUrlKeyDto } from './dto/create-url-key.dto'
import { UpdateUrlKeyDto } from './dto/update-url-key.dto'
import { QueryUrlKeyDto } from './dto/query-url-key.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@ApiTags('sys/url-key')
@Controller('/sys/url-key')
export class UrlKeyController {
  constructor(private readonly urlKeyService: UrlKeyService) {}

  @Post()
  create(@Body() createUrlKeyDto: CreateUrlKeyDto) {
    return this.urlKeyService.create(createUrlKeyDto)
  }

  @Get()
  findAll(@PaginationParams() pagination: Pagination, @Query() query: QueryUrlKeyDto) {
    return this.urlKeyService.findAll(pagination, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.urlKeyService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUrlKeyDto: UpdateUrlKeyDto) {
    return this.urlKeyService.update(id, updateUrlKeyDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.urlKeyService.remove(id)
  }
}
