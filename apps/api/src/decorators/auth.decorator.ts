import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import type { Role } from '@/interface/role'
import { RolesGuard } from '../guard/roles.guard'
import { JwtBackendAuthGuard } from '../modules/jwt/jwt-auth.guard'

export const ROLES_KEY: string = 'roles'

export const Auth = (...roles: Role[]) => {
  const metaRoles: Role[] = roles.length > 0 ? roles : ['ADMIN', 'REVIEWER', 'SYSTEM']
  return applyDecorators(
    SetMetadata(ROLES_KEY, metaRoles),
    UseGuards(JwtBackendAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized'
    })
  )
}
