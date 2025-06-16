import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { CreateEmailLogDto } from './dto/create-email-log.dto'
import { UpdateEmailLogDto } from './dto/update-email-log.dto'

@Injectable()
export class EmailLogService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEmailLogDto: CreateEmailLogDto) {
    return this.prisma.emailLogger.create({
      data: createEmailLogDto
    })
  }

  findAll() {
    return this.prisma.emailLogger.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  findOne(id: number) {
    return this.prisma.emailLogger.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateEmailLogDto: UpdateEmailLogDto) {
    return this.prisma.emailLogger.update({
      where: {
        id
      },
      data: updateEmailLogDto
    })
  }

  remove(id: number) {
    return this.prisma.emailLogger.delete({
      where: {
        id
      }
    })
  }
}
