import { Module } from '@nestjs/common'

import { OSSService } from '@/oss/oss.service'
import { PrismaModule } from '@/prisma/prisma.module'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'

@Module({
  controllers: [CategoryController],
  providers: [OSSService, CategoryService],
  imports: [PrismaModule]
})
export class CategoryModule {}
