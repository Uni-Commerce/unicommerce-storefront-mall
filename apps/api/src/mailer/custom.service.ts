import { Injectable } from '@nestjs/common'
import { ISendMailOptions } from '@nestjs-modules/mailer'
import type { Transporter } from 'nodemailer'

import { MailerConfigService } from './mailer.service'

@Injectable()
export class CustomMailerService {
  constructor(private readonly mailerConfigService: MailerConfigService) {}

  updateMailerOptions(config: any) {
    this.mailerConfigService.updateMailerOptions(config)
  }

  sendMail(options: ISendMailOptions) {
    const transporter: Transporter = this.mailerConfigService.getTransporter()
    return transporter.sendMail({ ...options })
  }

  async sendTemplateMail(options: ISendMailOptions) {
    const { context, template, ...rest } = options
    const html = await this.mailerConfigService.compileTemplate(template, context)
    return this.sendMail({ ...rest, html })
  }
}
