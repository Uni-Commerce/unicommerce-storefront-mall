import { Test, TestingModule } from '@nestjs/testing'

import { StoreAuthService } from './auth.service'

describe('AuthService', () => {
  let service: StoreAuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreAuthService]
    }).compile()

    service = module.get<StoreAuthService>(StoreAuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
