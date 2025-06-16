import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { StoreCmsService } from './cms.service'

@ApiTags('storefront/cms')
@Controller('storefront/cms')
export class StoreCmsController {
  constructor(private readonly cmsService: StoreCmsService) {}
}
