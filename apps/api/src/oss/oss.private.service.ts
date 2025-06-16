import { Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OSS from 'ali-oss'

@Injectable()
export class OSSPrivateService {
  private stsClient: OSS.STS
  private currentClient: OSS
  private lastRefreshTime: number

  constructor(private configService: ConfigService) {
    // 初始化STS客户端
    this.stsClient = new OSS.STS({
      accessKeyId: this.configService.get('NEST_APP_ALIYUN_OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('NEST_APP_ALIYUN_OSS_ACCESS_KEY_SECRET')
    })

    // 初始化时创建OSS客户端
    this.initOSSClient()
  }

  // 获取临时凭证
  private async getSTSCredentials() {
    try {
      const policy = {
        Version: '1',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['oss:PutObject', 'oss:GetObject', 'oss:DeleteObject'],
            Resource: [
              `acs:oss:*:*:${this.configService.get('NEST_APP_ALIYUN_OSS_BUCKET')}`,
              `acs:oss:*:*:${this.configService.get('NEST_APP_ALIYUN_OSS_BUCKET')}/*`
            ]
          }
        ]
      }
      const result = await this.stsClient.assumeRole(
        this.configService.get<string>('NEST_APP_ALIYUN_OSS_RAM_ROLE_ARN'),
        JSON.stringify(policy),
        60 * 60 * 12, // 有效期60分钟
        'nestjs-oss-upload'
      )
      this.lastRefreshTime = Date.now()
      return result.credentials
    } catch (error: any) {
      console.error('获取STS临时凭证失败:', error)
      throw new BadRequestException(`获取STS临时凭证失败: ${error.message}`)
    }
  }

  // 初始化或刷新OSS客户端
  private async initOSSClient() {
    try {
      const credentials = await this.getSTSCredentials()
      this.currentClient = new OSS({
        region: this.configService.get('NEST_APP_ALIYUN_OSS_REGION'),
        accessKeyId: credentials.AccessKeyId,
        accessKeySecret: credentials.AccessKeySecret,
        stsToken: credentials.SecurityToken,
        bucket: this.configService.get('NEST_APP_ALIYUN_OSS_BUCKET'),
        secure: true,
        // 设置刷新函数
        refreshSTSToken: async () => {
          const creds = await this.getSTSCredentials()
          return {
            accessKeyId: creds.AccessKeyId,
            accessKeySecret: creds.AccessKeySecret,
            stsToken: creds.SecurityToken
          }
        },
        // 设置刷新间隔（11小时）
        refreshSTSTokenInterval: 60 * 60 * 1000 * 11
      })
    } catch (error) {
      console.error('初始化OSS客户端失败:', error)
      throw error
    }
  }

  // 获取当前OSS客户端
  private async getOSSClient(): Promise<OSS> {
    if (
      !this.currentClient ||
      (this.lastRefreshTime && Date.now() - this.lastRefreshTime > 60 * 60 * 1000 * 11.5)
    ) {
      await this.initOSSClient()
    }
    return this.currentClient
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    if (process.env.NODE_ENV !== 'development') {
      try {
        const client = await this.getOSSClient()
        const result = await client.put(path, file.buffer, {
          headers: {
            'Content-Type': file.mimetype,
            'Content-Disposition': 'inline',
            'x-oss-object-acl': 'private'
          }
        })
        return result.url
      } catch (error: any) {
        throw new BadRequestException(`上传文件到OSS失败: ${error.message}`)
      }
    }
  }

  async deleteFile(url: string): Promise<void> {
    if (process.env.NODE_ENV !== 'development') {
      try {
        const client = await this.getOSSClient()
        await client.delete(url)
      } catch (error: any) {
        throw new BadRequestException(`从OSS删除文件失败: ${error.message}`)
      }
    }
  }

  async getPrivateUrl(objectKey: string, expires = 3600): Promise<string> {
    const client = await this.getOSSClient()
    const ossUrl = client.signatureUrl(objectKey, {
      expires,
      method: 'GET'
    })
    const domainUrl = ossUrl.replace(
      `${this.configService.get('NEST_APP_ALIYUN_OSS_BUCKET')}.${this.configService.get('NEST_APP_ALIYUN_OSS_REGION')}.aliyuncs.com`,
      this.configService.get<string>('NEST_APP_ALIYUN_OSS_DOMAIN')
    )
    return domainUrl
  }
}
