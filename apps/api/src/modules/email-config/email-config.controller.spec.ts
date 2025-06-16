import { Test, TestingModule } from '@nestjs/testing'
import { EmailConfigController } from './email-config.controller'
import { EmailConfigService } from './email-config.service'

describe('EmailConfigController', () => {
  let controller: EmailConfigController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailConfigController],
      providers: [EmailConfigService]
    }).compile()

    controller = module.get<EmailConfigController>(EmailConfigController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
