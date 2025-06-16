import { Injectable } from '@nestjs/common'
import { UrlKeyType } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'
import { CreateCmDto } from './dto/create-cm.dto'
import { UpdateCmDto } from './dto/update-cm.dto'
import { QueryCmsDto } from './dto/query-cms.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCmDto: CreateCmDto) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const cms = await prisma.cmsPage.create({
        data: createCmDto
      })
      await prisma.urlKey.create({
        data: {
          type: UrlKeyType.CMS,
          url: createCmDto.url,
          typeId: cms.id,
          disabled: false
        }
      })
      return cms
    })
    return result
  }

  async findAll(pagination: Pagination, query: QueryCmsDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        ...(query.url && {
          url: {
            contains: query.url
          }
        }),
        ...(query.title && {
          title: {
            contains: query.title
          }
        })
      }
    }
    const total = await this.prisma.cmsPage.count(params)
    const cmsList = await this.prisma.cmsPage.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params
    })
    return {
      data: cmsList,
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
    return this.prisma.cmsPage.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateCmDto: UpdateCmDto) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const cms = await prisma.cmsPage.update({
        where: {
          id
        },
        data: updateCmDto
      })
      await prisma.urlKey.update({
        where: {
          type_typeId: {
            type: UrlKeyType.CMS,
            typeId: id
          }
        },
        data: {
          url: cms.url,
          disabled: cms.disabled
        }
      })
    })
    return result
  }

  async remove(id: number) {
    const result = await this.prisma.$transaction(async (prisma) => {
      const cms = await this.prisma.cmsPage.delete({
        where: {
          id
        }
      })
      await prisma.urlKey.delete({
        where: {
          type_typeId: {
            type: UrlKeyType.CMS,
            typeId: id
          }
        }
      })
      return cms
    })
    return result
  }
}
