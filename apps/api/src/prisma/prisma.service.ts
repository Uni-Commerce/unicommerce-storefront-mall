import { Injectable, Inject, OnModuleInit, Optional } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

import { PrismaServiceOptions } from '../interface/prisma.options'
import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'info' | 'warn' | 'error'>
  implements OnModuleInit
{
  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    private prismaServiceOptions: PrismaServiceOptions = {}
  ) {
    super(prismaServiceOptions.prismaOptions)

    if (this.prismaServiceOptions.middlewares) {
      this.prismaServiceOptions.middlewares.forEach((middleware) => this.$use(middleware))
    }
  }

  async onModuleInit() {
    if (this.prismaServiceOptions.explicitConnect) {
      await this.$connect()
    }
  }
}
