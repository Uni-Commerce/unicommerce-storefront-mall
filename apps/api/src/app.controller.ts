import { Controller, Get, Res } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

import { AppService } from './app.service'

@ApiTags('core/app')
@Controller('core/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('iframe')
  async getIframe(@Res() res: Response) {
    const html = await this.appService.getIframe()
    res.send(html)
  }
}
