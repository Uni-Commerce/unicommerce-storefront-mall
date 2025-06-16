import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PaginationParams } from '@/decorators/pagination.decorator'
import { RegionService } from './region.service'
import { QueryRegionDto } from './dto/query-region.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@ApiTags('sys/region')
@Controller('sys/region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get()
  findRegion() {
    return this.regionService.findRegion()
  }

  @Get('province')
  findProvince(@PaginationParams() pagination: Pagination, @Query() query: QueryRegionDto) {
    return this.regionService.findProvince(pagination, query)
  }

  @Get('city')
  findCity(@PaginationParams() pagination: Pagination, @Query() query: QueryRegionDto) {
    return this.regionService.findCity(pagination, query)
  }

  @Get('district')
  findDistrict(@PaginationParams() pagination: Pagination, @Query() query: QueryRegionDto) {
    return this.regionService.findDistrict(pagination, query)
  }

  @Get('tree')
  findTree() {
    return this.regionService.findTree()
  }

  @Get(':code')
  findChildren(@Param('code') code: string) {
    return this.regionService.findChildren(code)
  }
}
