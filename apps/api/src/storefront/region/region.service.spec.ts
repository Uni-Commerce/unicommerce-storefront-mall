import { Test, TestingModule } from '@nestjs/testing'

import { StoreRegionService } from './region.service'

describe('StoreRegionService', () => {
  let service: StoreRegionService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreRegionService]
    }).compile()

    service = module.get<StoreRegionService>(StoreRegionService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
