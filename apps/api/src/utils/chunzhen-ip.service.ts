import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class ChunZhenIpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}
  private readonly BASE_API_URL: string = 'https://cz88geoaliyun.cz88.net/search/ip/geo'

  async getLocationByIp(ip: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.BASE_API_URL, {
          headers: {
            Authorization: `APPCODE ${this.configService.get<string>('NEST_APP_CHUNZHEN_IP_API_CODE')}`
          },
          params: {
            ip
          }
        })
      )
      return response.data?.data ?? {}
    } catch (_) {
      throw new Error('纯真IP定位服务请求失败')
    }
  }
}
