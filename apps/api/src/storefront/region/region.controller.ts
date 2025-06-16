import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { StoreAuth } from '@/decorators/storeAuth.decorator'
import { StoreRegionService } from './region.service'

@ApiTags('storefront/region')
@Controller('storefront/region')
export class StoreRegionController {
  constructor(private readonly regionService: StoreRegionService) {}

  @Get()
  @StoreAuth()
  async getRegions() {
    return await this.regionService.getRegions()
  }

  @Get('area')
  async getRegionArea() {
    return await this.regionService.getRegionArea()
  }
}
