import { Test, TestingModule } from '@nestjs/testing'

import { StoreCmsService } from './cms.service'

describe('StoreCmsService', () => {
  let service: StoreCmsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreCmsService]
    }).compile()

    service = module.get<StoreCmsService>(StoreCmsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
