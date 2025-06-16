import { Injectable, BadRequestException } from '@nestjs/common'
import { extname, join } from 'node:path'

import { PrismaService } from '@/prisma/prisma.service'
import { OSSService } from '@/oss/oss.service'
import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'
import { QueryBannerDto } from './dto/query-banner.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class BannerService {
  constructor(
    private prisma: PrismaService,
    private ossService: OSSService
  ) {}

  async uploadFile(file: Express.Multer.File, oldFilePath?: string) {
    try {
      const baseUploadDir = 'static/upload/banner'
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 8) // 6位随机字符串
      const ext = extname(file.originalname)
      const name = `${timestamp}-${randomString}${ext}`
      const filePath = join(baseUploadDir, name)

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

  async create(createBannerDto: CreateBannerDto, file: Express.Multer.File) {
    const filePath = await this.uploadFile(file)
    const { status, ...rest } = createBannerDto
    return this.prisma.banner.create({
      data: {
        ...rest,
        disabled: status === '0',
        image: filePath
      }
    })
  }

  async findAll(pagination: Pagination, query: QueryBannerDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        ...(query.url && {
          url: {
            contains: query.url
          }
        })
      }
    }
    const total = await this.prisma.banner.count(params)
    const bannerList = await this.prisma.banner.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params
    })
    return {
      data: bannerList,
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
    return this.prisma.banner.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, updateBannerDto: UpdateBannerDto, file: Express.Multer.File) {
    const { status, ...rest } = updateBannerDto
    const exist = await this.findOne(id)

    const params = file
      ? { file: '' }
      : {
          file: exist?.image
        }
    if (file) {
      params.file = await this.uploadFile(file, exist?.image)
    }
    return this.prisma.banner.update({
      where: {
        id
      },
      data: {
        ...rest,
        disabled: status === '0',
        image: params.file
      }
    })
  }

  async remove(id: number) {
    const banner = await this.prisma.banner.delete({
      where: {
        id
      }
    })
    if (banner.image) {
      await this.ossService.deleteFile(banner.image)
    }
    return banner
  }
}
