import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AdminService } from '../admin/admin.service'

@Injectable()
export class JwtBackendStrategy extends PassportStrategy(Strategy, 'backend') {
  constructor(
    configService: ConfigService,
    private adminService: AdminService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('NEST_APP_JWT_SECRET')
    })
  }

  async validate(payload: { adminId: number }) {
    const admin = await this.adminService.findOne(Number(payload.adminId))

    if (!admin) {
      throw new UnauthorizedException()
    }

    return admin
  }
}
