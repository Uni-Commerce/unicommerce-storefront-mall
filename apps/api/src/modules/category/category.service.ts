import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { UrlKeyType } from '@prisma/client'
import { extname, join } from 'node:path'

import { OSSService } from '@/oss/oss.service'
import { PrismaService } from '@/prisma/prisma.service'
import { encryptUserId } from '@/utils/encryptUserId'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { QueryCategoryDto } from './dto/query-category.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private ossService: OSSService
  ) {}

  async uploadFile(id: bigint, file: Express.Multer.File, oldFilePath?: string) {
    try {
      const baseUploadDir = 'static/upload/category'
      const encryptedId = encryptUserId(id.toString())
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 8) // 6位随机字符串
      const ext = extname(file.originalname)
      const name = `${timestamp}-${randomString}${ext}`
      const filePath = join(baseUploadDir, encryptedId, name)

      // 如果有旧文件且上传了新文件，删除旧文件
      if (oldFilePath) {
        await this.ossService.deleteFile(oldFilePath)
      }

      // 上传到OSS
      await this.ossService.uploadFile(file, filePath)
      return filePath
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
    const { status, level, parentId, ...rest } = createCategoryDto

    const result = this.prisma.$transaction(async (prisma) => {
      const category = await prisma.category.create({
        data: {
          ...rest,
          level: Number(level),
          parentId: parentId ? Number(parentId) : null,
          disabled: status === '0'
        }
      })
      await prisma.urlKey.create({
        data: {
          type: UrlKeyType.CATEGORY,
          typeId: category.id,
          url: createCategoryDto.urlKey,
          disabled: status === '0'
        }
      })
      if (file) {
        const filePath = await this.uploadFile(category.id, file)
        const newCategory = await prisma.category.update({
          where: {
            id: category.id
          },
          data: {
            image: filePath
          }
        })
        return newCategory
      }
      return category
    })
    return result
  }

  private buildTreeWithLevel(items: any[]) {
    // 按level排序，确保父节点先处理
    items.sort((a, b) => a.level - b.level || a.createdAt - b.createdAt)

    const map = {}
    const roots = []

    items.forEach((item) => {
      map[item.id] = { ...item, children: [] }

      if (item.level === 1) {
        roots.push(map[item.id])
      } else if (item.parentId && map[item.parentId]) {
        map[item.parentId].children.push(map[item.id])
      }
    })

    return roots
  }

  async findAll(pagination: Pagination, query: QueryCategoryDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        ...(query.urlKey && {
          urlKey: {
            contains: query.urlKey
          }
        }),
        ...(query.name && {
          name: {
            contains: query.name
          }
        })
      }
    }
    const total = await this.prisma.category.count(params)
    const categories = await this.prisma.category.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'asc'
      },
      ...params,
      include: {
        parent: {
          select: {
            id: true,
            level: true
          }
        }
      }
    })
    return {
      data: categories,
      meta: {
        pagination: {
          page,
          size,
          total
        }
      }
    }
  }

  async findTree() {
    // 递归CTE查询所有节点并按层级排序
    const result: any[] = await this.prisma.$queryRaw`
      WITH RECURSIVE category_tree AS (
        -- 基础查询：获取所有level=1的节点
        SELECT id, "parentId", name, level, "createdAt", 1 as depth
        FROM "category" 
        WHERE level = 1
        
        UNION ALL
        
        -- 递归查询：获取所有子节点
        SELECT c.id, c."parentId", c.name, c.level, c."createdAt", ct.depth + 1
        FROM "category" c
        JOIN category_tree ct ON c."parentId" = ct.id
      )
      SELECT * FROM category_tree
      ORDER BY depth, "createdAt" ASC
    `

    // 构建树形结构时考虑level字段
    return this.buildTreeWithLevel(result)
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    })
    if (!category) throw new NotFoundException('Category not found.')
    return category
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto, file: Express.Multer.File) {
    const { status, level, parentId, ...rest } = updateCategoryDto

    const result = this.prisma.$transaction(async (prisma) => {
      const category = await prisma.category.update({
        where: {
          id
        },
        data: {
          ...rest,
          level: Number(level),
          parentId: parentId ? Number(parentId) : null,
          disabled: status === '0'
        }
      })
      await prisma.urlKey.upsert({
        where: {
          type_typeId: {
            type: UrlKeyType.CATEGORY,
            typeId: category.id
          }
        },
        create: {
          type: UrlKeyType.CATEGORY,
          typeId: category.id,
          url: updateCategoryDto.urlKey,
          disabled: status === '0'
        },
        update: {
          type: UrlKeyType.CATEGORY,
          typeId: category.id,
          url: updateCategoryDto.urlKey,
          disabled: status === '0'
        }
      })
      if (file) {
        const filePath = await this.uploadFile(category.id, file, category.image)
        const newCategory = await prisma.category.update({
          where: {
            id: category.id
          },
          data: {
            image: filePath
          }
        })
        return newCategory
      }
      return category
    })

    return result
  }

  async remove(id: number) {
    const result = this.prisma.$transaction(async (prisma) => {
      const category = await prisma.category.delete({
        where: {
          id
        }
      })
      await this.ossService.deleteFile(category.image)
      await prisma.urlKey.delete({
        where: {
          type_typeId: {
            type: UrlKeyType.CATEGORY,
            typeId: id
          }
        }
      })
      return category
    })
    return result
  }

  private async deleteFile(filePath: string): Promise<void> {
    if (!filePath) return // 防止处理空路径

    try {
      // 获取项目根目录
      const rootDir = process.cwd()

      // 构造完整文件路径
      const fullPath = join(rootDir, 'public', filePath.replace('static/', ''))

      const fs = require('fs').promises
      await fs.unlink(fullPath)
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.info(`File not found: ${filePath}`)
        return
      }
      console.info(`Error deleting file ${filePath}:`, error)
    }
  }
}
