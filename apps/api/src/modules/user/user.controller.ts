import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe
} from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { PaginationParams } from '@/decorators/pagination.decorator'
import { Auth } from '@/decorators/auth.decorator'
import { UserEntity } from './entities/user.entity'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { QueryUserDto } from './dto/query-user.dto'
import type { Pagination } from '@/decorators/pagination.decorator'

@Auth()
@ApiTags('sys/user')
@Controller('sys/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto)
    return new UserEntity(user)
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(@PaginationParams() pagination: Pagination, @Query() query: QueryUserDto) {
    const result = await this.userService.findAll(pagination, query)
    return result
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id)
    return new UserEntity(user)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.remove(id)
    return new UserEntity(user)
  }

  @Delete('/debind/:id')
  @ApiOkResponse({ type: UserEntity })
  async debind(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.debind(id)
    return new UserEntity(user)
  }
}
