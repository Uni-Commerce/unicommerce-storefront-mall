import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class JwtStorefrontStrategy extends PassportStrategy(Strategy, 'storefront') {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NEST_APP_JWT_STOREFRONT_SECRET')
    })
  }

  async validate(payload: { userId: number }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: Number(payload.userId)
      }
    })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
