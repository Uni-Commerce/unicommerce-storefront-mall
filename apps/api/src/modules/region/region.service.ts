import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'
import { QueryRegionDto } from './dto/query-region.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  findRegion() {
    return this.prisma.region.findMany({
      where: {
        level: 1
      },
      select: {
        code: true,
        name: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  async findProvince(pagination: Pagination, query: QueryRegionDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        level: 1,
        ...(query.name && {
          name: {
            contains: query.name
          }
        }),
        ...(query.code && {
          code: {
            equals: query.code
          }
        })
      }
    }
    const total = await this.prisma.region.count(params)
    const regionList = await this.prisma.region.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params,
      select: {
        code: true,
        disabled: true,
        id: true,
        level: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return {
      data: regionList,
      meta: {
        pagination: {
          page,
          size,
          total
        }
      }
    }
  }

  async findCity(pagination: Pagination, query: QueryRegionDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        level: 2,
        ...(query.name && {
          name: {
            contains: query.name
          }
        }),
        ...(query.code && {
          code: {
            equals: query.code
          }
        })
      }
    }
    const total = await this.prisma.region.count(params)
    const regionList = await this.prisma.region.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params,
      select: {
        code: true,
        disabled: true,
        id: true,
        level: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return {
      data: regionList,
      meta: {
        pagination: {
          page,
          size,
          total
        }
      }
    }
  }

  async findDistrict(pagination: Pagination, query: QueryRegionDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        level: 3,
        ...(query.name && {
          name: {
            contains: query.name
          }
        }),
        ...(query.code && {
          code: {
            equals: query.code
          }
        })
      }
    }
    const total = await this.prisma.region.count(params)
    const regionList = await this.prisma.region.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params,
      select: {
        code: true,
        disabled: true,
        id: true,
        level: true,
        name: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return {
      data: regionList,
      meta: {
        pagination: {
          page,
          size,
          total
        }
      }
    }
  }

  findChildren(code: string) {
    return this.prisma.region.findMany({
      where: {
        code: code
      },
      select: {
        children: {
          select: {
            code: true,
            name: true,
            children: {
              select: {
                code: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  async findTree() {
    const provinces = await this.prisma.region.findMany({
      where: { level: 1, disabled: false },
      include: {
        children: {
          where: { disabled: false },
          include: {
            children: {
              where: { disabled: false },
              include: {
                children: {
                  where: { disabled: false }
                }
              }
            }
          }
        }
      }
    })
    return provinces
  }
}
