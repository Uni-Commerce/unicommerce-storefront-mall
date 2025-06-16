import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common'
import { Request } from 'express'

export interface Search {
  condition: string
  search: string
}

// ?search=gloabl
export const SearchParams = createParamDecorator((__, ctx: ExecutionContext): Search => {
  const req: Request = ctx.switchToHttp().getRequest()
  const search = (req.query?.search as string) || ''
  const condition = (req.query?.condition as string) || ''

  if (req.headers.referer.indexOf('?search=') > -1 && search === '') {
    throw new BadRequestException('Invalid search params')
  }

  return { condition, search }
})
