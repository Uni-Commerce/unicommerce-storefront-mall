import { Test, TestingModule } from '@nestjs/testing'

import { StoreCmsController } from './cms.controller'
import { StoreCmsService } from './cms.service'

describe('StoreCmsController', () => {
  let controller: StoreCmsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreCmsController],
      providers: [StoreCmsService]
    }).compile()

    controller = module.get<StoreCmsController>(StoreCmsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
