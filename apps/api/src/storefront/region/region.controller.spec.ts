import { Test, TestingModule } from '@nestjs/testing'

import { StoreRegionController } from './region.controller'
import { StoreRegionService } from './region.service'

describe('StoreRegionController', () => {
  let controller: StoreRegionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreRegionController],
      providers: [StoreRegionService]
    }).compile()

    controller = module.get<StoreRegionController>(StoreRegionController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
