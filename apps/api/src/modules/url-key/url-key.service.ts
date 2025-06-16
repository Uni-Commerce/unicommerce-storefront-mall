import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { CreateUrlKeyDto } from './dto/create-url-key.dto'
import { UpdateUrlKeyDto } from './dto/update-url-key.dto'
import { QueryUrlKeyDto } from './dto/query-url-key.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class UrlKeyService {
  constructor(private prisma: PrismaService) {}

  create(createUrlKeyDto: CreateUrlKeyDto) {
    return this.prisma.urlKey.create({
      data: createUrlKeyDto
    })
  }

  async findAll(pagination: Pagination, query: QueryUrlKeyDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        ...(query.url && {
          url: {
            contains: query.url
          }
        }),
        ...(query.type && {
          type: {
            equals: query.type
          }
        })
      }
    }
    const total = await this.prisma.urlKey.count(params)
    const urlKeys = await this.prisma.urlKey.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params
    })
    return {
      data: urlKeys,
      meta: {
        pagination: {
          page,
          size,
          total
        }
      }
    }
  }

  findOne(id: number) {
    return this.prisma.urlKey.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateUrlKeyDto: UpdateUrlKeyDto) {
    return this.prisma.urlKey.update({
      where: {
        id
      },
      data: updateUrlKeyDto
    })
  }

  remove(id: number) {
    return this.prisma.urlKey.delete({
      where: {
        id
      }
    })
  }
}
