import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { decode } from 'html-entities'
import ejs from 'ejs'
import CryptoJS from 'crypto-js'

import { PrismaService } from '@/prisma/prisma.service'
import { CustomMailerService } from '@/mailer/custom.service'

type ApplyCouponType = {
  company?: {
    email: string
    name: string
    userName: string
  }
  coupon?: {
    code: string
    name?: string
    price?: number
  }
  campaign?: {
    name: string
    startDate: Date
    endDate: Date
  }
}

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly customMailerService: CustomMailerService
  ) {}

  unescapeHtml(html: string): string {
    return decode(html)
  }

  async sendConnectEmail(mail_address: string, name: string, password: string) {
    const reset_password_token = CryptoJS.MD5(mail_address).toString()

    return this.customMailerService.sendTemplateMail({
      to: mail_address,
      from: `Connect ${process.env.NEST_APP_EMAIL_FROM}`,
      subject: 'Connect Email',
      context: {
        name,
        email: mail_address,
        reset_password_url: `${process.env.NEST_APP_ADMIN_URL}/reset-password/${reset_password_token}`,
        password
      },
      template: 'create_user.ejs'
    })
  }

  async sendCreateAdminMail(mail_address: string, name: string, password: string) {
    const result = await this.prisma.$transaction(async (prisma) => {
      // const reset_password_token = CryptoJS.MD5(mail_address).toString()
      const config = await prisma.emailTemplate.findUnique({
        where: {
          type: 'CREATE_USER'
        }
      })

      if (config) {
        const template = ejs.compile(this.unescapeHtml(config.html))
        const result = template({
          name,
          email: mail_address,
          // reset_password_url: `${process.env.NEST_APP_ADMIN_URL}/reset-password/${reset_password_token}`,
          password,
          websiteURL: this.configService.get<string>('NEST_APP_H5_FRONTEND_URL')
        })
        const mail = await this.customMailerService.sendMail({
          to: mail_address,
          from: config.from,
          subject: config.subject,
          html: result
        })
        await this.prisma.emailLogger.create({
          data: {
            type: 'CREATE_USER',
            to: mail_address,
            from: config.from,
            subject: config.subject
          }
        })
        return mail
      } else {
        return {}
      }
    })

    return result
  }

  async sendDeleteAdminMail(mail_address: string, name: string) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const config = await prisma.emailTemplate.findUnique({
        where: {
          type: 'DELETE_USER'
        }
      })
      if (config) {
        const template = ejs.compile(this.unescapeHtml(config.html))
        const params = template({
          name,
          email: mail_address
        })
        const mail = await this.customMailerService.sendMail({
          to: mail_address,
          from: config.from,
          subject: config.subject,
          html: params
        })
        await prisma.emailLogger.create({
          data: {
            type: 'DELETE_USER',
            to: mail_address,
            from: config.from,
            subject: config.subject
          }
        })
        return mail
      } else {
        return {}
      }
    })
    return result
  }

  async sendApplyCoupon({ company, coupon, campaign }: ApplyCouponType) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const config = await prisma.emailTemplate.findUnique({
        where: {
          type: 'CREATE_COMPANY'
        }
      })
      if (config) {
        const template = ejs.compile(this.unescapeHtml(config.html))
        const params = template({
          couponCode: coupon.code,
          couponName: coupon.name,
          couponPrice: `¥${coupon.price}`,
          companyName: company.name,
          companyUserName: company.userName,
          companyEmail: company.email,
          campaignName: campaign.name,
          campaignStartDate: campaign.startDate,
          campaignEndDate: campaign.endDate
        })
        const mail = await this.customMailerService.sendMail({
          to: company.email,
          from: config.from,
          subject: config.subject,
          html: params
        })
        await prisma.emailLogger.create({
          data: {
            type: 'CREATE_COMPANY',
            to: company.email,
            from: config.from,
            subject: config.subject
          }
        })
        return mail
      } else {
        return {}
      }
    })
    return result
  }

  async sendDeleteCompanyMail({ company }: ApplyCouponType) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const config = await prisma.emailTemplate.findUnique({
        where: {
          type: 'DELETE_COMPANY'
        }
      })
      if (config) {
        const template = ejs.compile(this.unescapeHtml(config.html))
        const params = template({
          companyName: company.name,
          companyUserName: company.userName,
          companyEmail: company.email
        })
        const mail = await this.customMailerService.sendMail({
          to: company.email,
          from: config.from,
          subject: config.subject,
          html: params
        })
        await prisma.emailLogger.create({
          data: {
            type: 'DELETE_COMPANY',
            to: company.email,
            from: config.from,
            subject: config.subject
          }
        })
        return mail
      } else {
        return {}
      }
    })
    return result
  }
}
