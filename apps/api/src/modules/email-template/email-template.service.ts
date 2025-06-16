import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { CreateEmailTemplateDto } from './dto/create-email-template.dto'
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto'

@Injectable()
export class EmailTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.prisma.emailTemplate.create({
      data: createEmailTemplateDto
    })
  }

  findAll() {
    return this.prisma.emailTemplate.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  findOne(id: number) {
    return this.prisma.emailTemplate.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.prisma.emailTemplate.update({
      where: {
        id
      },
      data: updateEmailTemplateDto
    })
  }

  remove(id: number) {
    return this.prisma.emailTemplate.delete({
      where: {
        id
      }
    })
  }
}
