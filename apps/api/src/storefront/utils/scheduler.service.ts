import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { PrismaService } from '@/prisma/prisma.service'

// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | months
// | | | day of month
// | | hours
// | minutes
// seconds (optional)

@Injectable()
export class SchedulerService {
  constructor(private prisma: PrismaService) {}

  // 每天检查并禁用过期的分类区域服务
  @Cron('0 0 * * *') // 每天午夜执行
  async deactivateExpiredCategoryAccess() {
    const now = new Date()
    const result = await this.prisma.userCategoryService.updateMany({
      where: {
        disabled: false,
        endDate: { lt: now }
      },
      data: { disabled: false }
    })
    console.info(`已禁用 ${result.count} 个过期的分类-区域服务`)
  }

  // 获取即将过期的分类区域服务（用于通知管理员）
  async getExpiringCategoryAccess(daysBefore: number = 3) {
    const soon = new Date()
    soon.setDate(soon.getDate() + daysBefore)

    return this.prisma.userCategoryService.findMany({
      where: {
        disabled: false,
        endDate: {
          lte: soon,
          gte: new Date() // 还未过期
        }
      },
      include: {
        regionAccess: true
      }
    })
  }
}
