import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class AmapLocationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}
  private readonly BASE_API_URL: string = 'https://restapi.amap.com/v3/ip'

  async getLocationByIp(ip: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.BASE_API_URL, {
          params: {
            key: this.configService.get('NEST_APP_AMAP_API_KEY'),
            ip
          }
        })
      )
      return response.data
    } catch (_) {
      throw new Error('高德IP定位服务请求失败')
    }
  }
}
