import { Injectable, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import OSS from 'ali-oss'
import sharp from 'sharp'

@Injectable()
export class OSSService {
  private client: OSS

  constructor(private configService: ConfigService) {
    this.client = new OSS({
      region: this.configService.get('NEST_APP_ALIYUN_OSS_REGION'),
      accessKeyId: this.configService.get('NEST_APP_ALIYUN_OSS_ACCESS_KEY_ID'),
      accessKeySecret: this.configService.get('NEST_APP_ALIYUN_OSS_ACCESS_KEY_SECRET'),
      bucket: this.configService.get('NEST_APP_ALIYUN_OSS_BUCKET'),
      secure: true
    })
  }

  async compressImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .jpeg({ quality: 80 }) // JPEG 中等质量
      .png({ compressionLevel: 9 }) // PNG 最大压缩
      .webp({ quality: 75 }) // WebP 通常比 JPEG 小25-35%
      .toBuffer()
  }

  async resizeAndCompress(
    buffer: Buffer,
    width: number,
    height: number,
    quality = 80
  ): Promise<Buffer> {
    return sharp(buffer).resize(width, height).jpeg({ quality }).toBuffer()
  }

  async uploadFile(file: Express.Multer.File, path: string): Promise<string> {
    if (process.env.NODE_ENV !== 'development') {
      try {
        const buffer = await this.compressImage(file.buffer)
        const result = await this.client.put(path, buffer, {
          headers: {
            'Content-Type': file.mimetype,
            'Content-Disposition': 'inline',
            'x-oss-object-acl': 'public-read'
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
        await this.client.delete(url)
      } catch (error: any) {
        throw new BadRequestException(`从OSS删除文件失败: ${error.message}`)
      }
    }
  }

  getPublicUrl(objectKey: string) {
    const domainURL: string = this.configService.get<string>('NEST_APP_ALIYUN_OSS_DOMAIN')
    return `https://${domainURL}/${objectKey}`
  }
}
