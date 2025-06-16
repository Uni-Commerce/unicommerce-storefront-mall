import { applyDecorators, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'

import { JwtStorefrontAuthGuard } from '../storefront/jwt/jwt-auth.guard'

export const StoreAuth = () => {
  return applyDecorators(
    UseGuards(JwtStorefrontAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized'
    })
  )
}
