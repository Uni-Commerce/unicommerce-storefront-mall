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
import { BannerService } from './banner.service'
import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'
import { QueryBannerDto } from './dto/query-banner.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Auth()
@ApiTags('sys/banner')
@Controller('sys/banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

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
    @Body(new ParseFormDataJsonPipe()) createBannerDto: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.bannerService.create(createBannerDto, file)
  }

  @Get()
  findAll(@PaginationParams() pagination: Pagination, @Query() query: QueryBannerDto) {
    return this.bannerService.findAll(pagination, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.findOne(id)
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ParseFormDataJsonPipe()) updateBannerDto: UpdateBannerDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.bannerService.update(id, updateBannerDto, file)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.remove(id)
  }
}
