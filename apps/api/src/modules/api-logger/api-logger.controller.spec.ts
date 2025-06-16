import { Test, TestingModule } from '@nestjs/testing'
import { ApiLoggerController } from './api-logger.controller'
import { ApiLoggerService } from './api-logger.service'

describe('ApiLoggerController', () => {
  let controller: ApiLoggerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiLoggerController],
      providers: [ApiLoggerService]
    }).compile()

    controller = module.get<ApiLoggerController>(ApiLoggerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
