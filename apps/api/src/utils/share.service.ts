import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ShareLinkService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  generateShareLink(id: string): string {
    return this.jwtService.sign(
      { id },
      {
        secret: this.configService.get<string>('NEST_APP_JWT_SHARE_SECRET'),
        expiresIn: this.configService.get<string>('NEST_APP_JWT_SHARE_EXPIRES')
      }
    )
  }

  verifyShareLink(token: string): string | null {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('NEST_APP_JWT_SHARE_SECRET')
      })
      return payload.id
    } catch (error) {
      console.info(error)
      return null
    }
  }
}
