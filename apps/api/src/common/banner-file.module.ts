import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './public/upload/banner',
        filename: (_, file, callback) => {
          const timestamp = Date.now()
          const randomString = Math.random().toString(36).substring(2, 8) // 6位随机字符串
          const ext = extname(file.originalname)
          callback(null, `${timestamp}-${randomString}${ext}`)
        }
      }),
      fileFilter: (_, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false)
        }
        callback(null, true)
      },
      limits: {
        fileSize: 1024 * 2000 // 2000kb
      }
    })
  ],
  exports: [MulterModule]
})
export class BannerFileModule {}
