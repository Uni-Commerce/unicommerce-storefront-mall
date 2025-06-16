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
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { PaginationParams } from '@/decorators/pagination.decorator'
import { Auth } from '@/decorators/auth.decorator'
import { AdminEntity } from './entities/admin.entity'
import { AdminService } from './admin.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { QueryAdminDto } from './dto/query-admin.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Auth()
@ApiTags('sys/admin')
@Controller('sys/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.create(createAdminDto)
    return new AdminEntity(admin)
  }

  @Get()
  @ApiOkResponse({ type: AdminEntity, isArray: true })
  async findAll(@PaginationParams() pagination: Pagination, @Query() query: QueryAdminDto) {
    const result = await this.adminService.findAll(pagination, query)
    return result
  }

  @Get(':id')
  @ApiOkResponse({ type: AdminEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const admin = await this.adminService.findOne(id)
    return new AdminEntity(admin)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: AdminEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const admin = await this.adminService.remove(id)
    return new AdminEntity(admin)
  }
}
