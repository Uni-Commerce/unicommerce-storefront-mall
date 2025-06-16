import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { CreateApiLoggerDto } from './dto/create-api-logger.dto'

@Injectable()
export class ApiLoggerService {
  constructor(private prisma: PrismaService) {}

  create(createApiLoggerDto: CreateApiLoggerDto) {
    return this.prisma.apiLogger.create({
      data: createApiLoggerDto
    })
  }

  findAll() {
    return this.prisma.apiLogger.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  remove(id: number) {
    return this.prisma.apiLogger.delete({
      where: {
        id
      }
    })
  }
}
