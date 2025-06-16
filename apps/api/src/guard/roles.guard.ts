import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { Role } from '@/interface/role'
import { ROLES_KEY } from '../decorators/auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ])

    if (!requiredRoles) return true
    const request = ctx.switchToHttp().getRequest()
    const { user } = request
    return requiredRoles.includes(user.role)
  }
}
