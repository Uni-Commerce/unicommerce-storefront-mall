import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT
        response.status(status).json({
          status,
          data: null,
          meta: {
            message: `${exception?.meta?.target?.[0]} is already exists`
          }
        })
        break
      }
      default:
        // default 500 error code
        super.catch(exception, host)
        break
    }
  }
}
