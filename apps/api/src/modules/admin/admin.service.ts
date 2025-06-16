import { Injectable, BadRequestException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '@/prisma/prisma.service'
import { MailService } from '../mails/mails.service'
import { CreateAdminDto } from './dto/create-admin.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { QueryAdminDto } from './dto/query-admin.dto'
import { AdminEntity } from './entities/admin.entity'
import type { Pagination } from '@/decorators/pagination.decorator'

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const hash: number = 10
      const password: string = '12345Abc'
      const { email, name, role, ...rest } = createAdminDto
      const newPassword: string = await bcrypt.hash(password, hash)
      const admin = await this.prisma.admin.create({
        data: {
          ...rest,
          email,
          name,
          role,
          password: newPassword
        }
      })
      await this.mailService.sendCreateAdminMail(email, name, password)
      return admin
    } catch (error: any) {
      console.info(error)
      const message: string = error?.response
      throw new BadRequestException(message)
    }
  }

  async findAll(pagination: Pagination, query: QueryAdminDto) {
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
    const total = await this.prisma.admin.count(params)
    const admins = await this.prisma.admin.findMany({
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
        role: true,
        disabled: true,
        createdAt: true,
        updatedAt: true
      }
    })
    const adminList = admins.map((admin) => new AdminEntity(admin))
    return {
      data: adminList,
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
    const admin = await this.prisma.admin.findUnique({
      where: { id }
    })
    return admin
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.prisma.admin.update({
        where: { id },
        data: updateAdminDto
      })
      return admin
    } catch (error) {
      console.info(error)
      throw new BadRequestException(error)
    }
  }

  async remove(id: number) {
    const admin = await this.prisma.admin.delete({
      where: { id }
    })
    await this.mailService.sendDeleteAdminMail(admin.email, admin.name)
    return admin
  }
}
