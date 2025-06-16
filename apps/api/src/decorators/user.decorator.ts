import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'

type UserKey = keyof User

export const GetUser = createParamDecorator((data: UserKey, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const { user } = request
  return data ? user?.[data] : user
})
