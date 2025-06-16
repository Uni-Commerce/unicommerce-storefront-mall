import { Injectable, BadRequestException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '@/prisma/prisma.service'
import { MailService } from '../mails/mails.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { QueryUserDto } from './dto/query-user.dto'
import { UserEntity } from './entities/user.entity'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hash: number = 10
      const password: string = '12345Abc'
      const { email, name, ...rest } = createUserDto
      const newPassword: string = await bcrypt.hash(password, hash)
      const user = await this.prisma.user.create({
        data: {
          ...rest,
          email,
          name,
          password: newPassword
        }
      })
      await this.mailService.sendCreateAdminMail(email, name, password)
      return user
    } catch (error: any) {
      console.info(error)
      const message: string = error?.response
      throw new BadRequestException(message)
    }
  }

  async findAll(pagination: Pagination, query: QueryUserDto) {
    const { page, limit, size, offset } = pagination
    const params = {
      where: {
        ...(query.name && {
          name: {
            contains: query.name
          }
        }),
        ...(query.email && {
          email: {
            contains: query.email
          }
        })
      }
    }
    const total = await this.prisma.user.count(params)
    const users = await this.prisma.user.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc'
      },
      ...params,
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        disabled: true,
        createdAt: true,
        updatedAt: true,
        removed: true,
        openid: true
      }
    })
    const userList = users.map((user) => new UserEntity(user))
    return {
      data: userList,
      meta: {
        pagination: {
          page,
          size,
          total
        }
      }
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        disabled: true,
        createdAt: true,
        updatedAt: true,
        removed: true,
        openid: true
      }
    })
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      })
      return user
    } catch (error) {
      console.info(error)
      throw new BadRequestException(error)
    }
  }

  async remove(id: number) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        removed: true
      }
    })
    await this.mailService.sendDeleteAdminMail(user.email, user.name)
    return user
  }

  async debind(id: number) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        openid: null
      }
    })
    return user
  }
}
