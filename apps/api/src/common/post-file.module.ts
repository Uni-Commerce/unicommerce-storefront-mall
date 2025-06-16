import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import { existsSync, mkdirSync } from 'fs'

import { encryptUserId } from '@/utils/encryptUserId'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req: any, __: any, callback) => {
          // 从请求中获取 user-id（假设通过 req.user 或 req.body）
          const userId = (req.user?.id || req.body.userId).toString()
          if (!userId) {
            return callback(new Error('User ID is required'), '')
          }

          // 加密 user-id
          const encryptedUserId = encryptUserId(userId)
          const destination = join('./public/upload/post', encryptedUserId)

          // 确保目录存在
          if (!existsSync(destination)) {
            mkdirSync(destination, { recursive: true })
          }
          callback(null, destination)
        },
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
export class PostFileModule {}
