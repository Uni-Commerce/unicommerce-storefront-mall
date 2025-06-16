import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class StoreRegionService {
  constructor(private prisma: PrismaService) {}

  async getRegions() {
    const result = await this.prisma.$transaction(async (prisma) => {
      const categories = await prisma.category.findMany({
        where: {
          disabled: false
        },
        select: {
          id: true,
          name: true,
          urlKey: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      })

      const regions = await this.prisma.region.findMany({
        where: { level: 1, disabled: false },
        select: {
          id: true,
          name: true,
          code: true,
          children: {
            where: { disabled: false },
            select: {
              id: true,
              name: true,
              code: true,
              children: {
                where: { disabled: false },
                select: {
                  id: true,
                  name: true,
                  code: true,
                  children: {
                    where: { disabled: false }
                  }
                }
              }
            }
          }
        }
      })

      return {
        categories,
        regions
      }
    })

    return result
  }

  async getRegionArea() {
    const regions = await this.prisma.region.findMany({
      where: { level: 1, disabled: false },
      select: {
        id: true,
        name: true,
        code: true,
        children: {
          where: { disabled: false },
          select: {
            id: true,
            name: true,
            code: true,
            children: {
              where: { disabled: false },
              select: {
                id: true,
                name: true,
                code: true,
                children: {
                  where: { disabled: false }
                }
              }
            }
          }
        }
      }
    })

    return regions
  }
}
