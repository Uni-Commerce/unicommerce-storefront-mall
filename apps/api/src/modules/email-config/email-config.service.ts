import { Injectable, BadRequestException } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { CustomMailerService } from '@/mailer/custom.service'
import { MailService } from '../mails/mails.service'
import { CreateEmailConfigDto } from './dto/create-email-config.dto'
import { UpdateEmailConfigDto } from './dto/update-email-config.dto'

@Injectable()
export class EmailConfigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly customMailerService: CustomMailerService
  ) {}

  async create(createEmailConfigDto: CreateEmailConfigDto) {
    const config = await this.prisma.emailConfig.create({
      data: createEmailConfigDto
    })
    await this.customMailerService.updateMailerOptions(config)

    return config
  }

  findOne(id: number) {
    return this.prisma.emailConfig.findUnique({
      where: { id }
    })
  }

  session() {
    return this.prisma.emailConfig.findFirst()
  }

  async update(id: number, updateEmailConfigDto: UpdateEmailConfigDto) {
    const config = await this.prisma.emailConfig.update({
      where: { id },
      data: updateEmailConfigDto
    })
    await this.customMailerService.updateMailerOptions(config)
    return config
  }

  remove(id: number) {
    return this.prisma.emailConfig.delete({
      where: {
        id
      }
    })
  }

  async connect() {
    try {
      const config = await this.session()

      if (!config) {
        throw new BadRequestException('请先完成配置邮件配置.')
      }

      const email: string = '454451758@qq.com'
      const name: string = '罗工'
      const password: string = '12345Abc'
      await this.mailService.sendConnectEmail(email, name, password)
      return {
        message: `测试邮件已经发送到${email}的邮箱, 请登录邮箱查看.`
      }
    } catch (error: any) {
      const message: string = error?.message
      throw new BadRequestException(`${message}: 邮件发送失败，请检查配置.`)
    }
  }
}
