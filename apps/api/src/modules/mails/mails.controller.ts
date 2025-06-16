import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Auth } from '@/decorators/auth.decorator'

@ApiTags('Mails')
@Auth()
@Controller()
export class MailController {}
