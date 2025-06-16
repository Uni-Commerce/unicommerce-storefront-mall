import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common'
import { Request } from 'express'

export interface Pagination {
  page: number
  limit: number
  size: number
  offset: number
}

// ?page=1&size=10
export const PaginationParams = createParamDecorator((_, ctx: ExecutionContext): Pagination => {
  const req: Request = ctx.switchToHttp().getRequest()
  const page = parseInt(req.query.page as string) || 1
  const size = parseInt(req.query.size as string) || 20

  // check if page and size are valid
  if (Number.isNaN(page) || page < 0 || Number.isNaN(size) || size < 0) {
    throw new BadRequestException('Invalid pagination params')
  }

  // do not allow to fetch large slices of the dataset
  if (size > 100) {
    throw new BadRequestException('Invalid pagination params: Max size is 100')
  }

  // calculate pagination parameters
  const limit = size
  const offset = (page - 1) * limit
  return { page, limit, size, offset }
})
