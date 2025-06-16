import { Test, TestingModule } from '@nestjs/testing'

import { UrlKeyService } from './url-key.service'

describe('UrlKeyService', () => {
  let service: UrlKeyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlKeyService]
    }).compile()

    service = module.get<UrlKeyService>(UrlKeyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
