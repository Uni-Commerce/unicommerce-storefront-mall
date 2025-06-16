import { Test, TestingModule } from '@nestjs/testing'

import { StoreAuthController } from './auth.controller'
import { StoreAuthService } from './auth.service'

describe('AuthController', () => {
  let controller: StoreAuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreAuthController],
      providers: [StoreAuthService]
    }).compile()

    controller = module.get<StoreAuthController>(StoreAuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
