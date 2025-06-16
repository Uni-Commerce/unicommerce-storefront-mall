import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags } from '@nestjs/swagger'

import { PaginationParams } from '@/decorators/pagination.decorator'
import { Auth } from '@/decorators/auth.decorator'
import { ParseFormDataJsonPipe } from '@/pipes/parse-form-data.pipe'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { QueryCategoryDto } from './dto/query-category.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Auth()
@ApiTags('sys/category')
@Controller('sys/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false)
        }
        callback(null, true)
      },
      limits: {
        fileSize: 1024 * 2000 // 2000kb
      }
    })
  )
  create(
    @Body(new ParseFormDataJsonPipe()) data: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.categoryService.create(data, file)
  }

  @Get()
  findAll(@PaginationParams() pagination: Pagination, @Query() query: QueryCategoryDto) {
    return this.categoryService.findAll(pagination, query)
  }

  @Get('tree')
  findTree() {
    return this.categoryService.findTree()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(+id)
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false)
        }
        callback(null, true)
      },
      limits: {
        fileSize: 1024 * 2000 // 2000kb
      }
    })
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ParseFormDataJsonPipe()) data: UpdateCategoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.categoryService.update(id, data, file)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id)
  }
}
