import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerOptionsFactory } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { join } from 'path'
import { readFileSync } from 'fs'
import { createTransport } from 'nodemailer'
import ejs from 'ejs'
import type { Transporter } from 'nodemailer'
import type { MailerOptions } from '@nestjs-modules/mailer'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  private transporter: Transporter

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    this.initialize()
  }

  getInitialMailerOptions(): MailerOptions {
    const options: MailerOptions = {
      transport: {
        connectionTimeout: 6000,
        host: this.configService.get<string>('NEST_APP_EMAIL_HOST'),
        port: this.configService.get<number>('NEST_APP_EMAIL_PORT'),
        auth: {
          user: this.configService.get<string>('NEST_APP_EMAIL_HOST_USER'),
          pass: this.configService.get<string>('NEST_APP_EMAIL_HOST_PASSWORD')
        },
        secure: this.configService.get<string>('NEST_APP_EMAIL_SECURE') === 'on',
        ignoreTLS: this.configService.get<string>('NEST_APP_EMAIL_IGNORE_TLS') === 'on'
      },
      defaults: {
        connectionTimeout: 6000,
        from: this.configService.get<string>('NEST_APP_EMAIL_FROM')
      },
      preview: this.configService.get<string>('NEST_APP_EMAIL_PREVIEW') === 'on',
      template: {
        dir: join(process.cwd(), 'src/templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true
        }
      }
    }

    return options
  }

  updateTransporter(options: MailerOptions) {
    this.transporter = createTransport(options.transport)
  }

  getTransporter(): Transporter {
    return this.transporter
  }

  async initialize() {
    const options = await this.loadMailerOptions()
    this.updateTransporter(options)
  }

  async loadMailerOptions(): Promise<MailerOptions> {
    return this.getInitialMailerOptions()
    // const config: any = await this.prisma.emailConfig.findFirst()

    // if (!config) return this.getInitialMailerOptions()

    // const mailerOptions: MailerOptions = {
    //   transport: {
    //     connectionTimeout: 6000,
    //     host: config.host,
    //     port: config.port,
    //     auth: {
    //       user: config.hostUser,
    //       pass: config.hostPassword
    //     },
    //     secure: config.secure,
    //     ignoreTLS: config.protocol !== 'tls'
    //   },
    //   defaults: {
    //     from: config.from,
    //     connectionTimeout: 6000
    //   }
    // }

    // return mailerOptions
  }

  async createMailerOptions(): Promise<MailerOptions> {
    const options = await this.loadMailerOptions()
    await this.updateTransporter(options)
    return options
  }

  async updateMailerOptions(config: any) {
    const options = await this.loadMailerOptions()
    const updatedOptions: MailerOptions = {
      ...options,
      transport: {
        connectionTimeout: 6000,
        host: config.host,
        port: config.port,
        auth: {
          user: config.hostUser,
          pass: config.hostPassword
        },
        secure: config.secure,
        ignoreTLS: config.protocol !== 'tls'
      },
      defaults: {
        connectionTimeout: 6000,
        from: config.from
      },
      preview: config.preview
    }
    this.updateTransporter(updatedOptions)
  }

  async compileTemplate(template: string, context: any): Promise<string> {
    const templatePath: string = join(process.cwd(), 'src/templates', template)
    const templateHtml: string = readFileSync(templatePath, 'utf8')
    const templateFunc = ejs.compile(templateHtml)
    const result = templateFunc(context)
    return result
  }
}
