import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { CreateSystemLogDto } from './dto/create-system-log.dto'
import { UpdateSystemLogDto } from './dto/update-system-log.dto'

@Injectable()
export class SystemLogService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSystemLogDto: CreateSystemLogDto) {
    return this.prisma.systemLog.create({
      data: createSystemLogDto
    })
  }

  async findAll() {
    const logs = await this.prisma.systemLog.findMany({
      include: {
        admin: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return logs.map((log) => {
      const { admin, ...rest } = log
      return {
        ...rest,
        admin: {
          name: admin.name,
          role: admin.role
        }
      }
    })
  }

  findOne(id: number) {
    return this.prisma.systemLog.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateSystemLogDto: UpdateSystemLogDto) {
    return this.prisma.systemLog.update({
      where: {
        id
      },
      data: updateSystemLogDto
    })
  }

  remove(id: number) {
    return this.prisma.systemLog.delete({
      where: {
        id
      }
    })
  }
}
