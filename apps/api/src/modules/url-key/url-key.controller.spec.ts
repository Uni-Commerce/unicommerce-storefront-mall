import { Test, TestingModule } from '@nestjs/testing'

import { UrlKeyController } from './url-key.controller'
import { UrlKeyService } from './url-key.service'

describe('UrlKeyController', () => {
  let controller: UrlKeyController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlKeyController],
      providers: [UrlKeyService]
    }).compile()

    controller = module.get<UrlKeyController>(UrlKeyController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
