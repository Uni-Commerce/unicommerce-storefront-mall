import { Module, DynamicModule, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n'
import { WinstonModule } from 'nest-winston'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { join } from 'node:path'
import * as winston from 'winston'
import 'winston-daily-rotate-file'
import type { Provider } from '@nestjs/common'

import { HttpExceptionFilter } from '@/filters/http-exception.filter'
import { HttpStatusIntercepter } from '@/interceptor/http-status.interceptor'
import { RealIpMiddleware } from '@/middleware/ip.middleware'
// Core Modules
import { RedisModule } from '@/redis/redis.module'
import { OSSModule } from '@/oss/oss.module'
import { PrismaModule } from '@/prisma/prisma.module'
// Backend Modules
import { MailerModule } from '@/mailer/mailer.module'
import { ApiLoggerModule } from '@/modules/api-logger/api-logger.module'
import { AdminModule } from '@/modules/admin/admin.module'
import { UserModule } from '@/modules/user/user.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { EmailConfigModule } from '@/modules/email-config/email-config.module'
import { EmailTemplateModule } from '@/modules/email-template/email-template.module'
import { EmailLogModule } from '@/modules/email-log/email-log.module'
import { SystemLogModule } from '@/modules/system-log/system-log.module'
import { RegionModule } from '@/modules/region/region.module'
import { CategoryModule } from '@/modules/category/category.module'
import { UrlKeyModule } from '@/modules/url-key/url-key.module'
import { BannerModule } from '@/modules/banner/banner.module'
import { CmsModule } from '@/modules/cms/cms.module'
// Storefront Modules
import { StoreAuthModule } from '@/storefront/auth/auth.module'
import { StoreUserModule } from '@/storefront/user/user.module'
import { StoreCmsModule } from '@/storefront/cms/cms.module'
import { StoreRegionModule } from '@/storefront/region/region.module'
// App Controller
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      envFilePath: ['.env.local', '.env.prod', '.env']
    })
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RealIpMiddleware).forRoutes('*')
  }

  static register(): DynamicModule {
    const controllers = [AppController]
    const imports = [
      WinstonModule.forRoot({
        // options
        transports: [
          new winston.transports.DailyRotateFile({
            dirname: 'logs', // 日志保存的目录
            filename: '%DATE%.log', // 日志名称，占位符 %DATE% 取值为 datePattern 值。
            datePattern: 'YYYY-MM-DD', // 日志轮换的频率，此处表示每天。
            zippedArchive: true, // 是否通过压缩的方式归档被轮换的日志文件。
            maxSize: '20m', // 设置日志文件的最大大小，m 表示 mb 。
            maxFiles: '14d', // 保留日志文件的最大天数，此处表示自动删除超过 14 天的日志文件。
            // 记录时添加时间戳信息
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
              }),
              winston.format.json()
            )
          })
        ]
      }),
      ThrottlerModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => [
          {
            ttl: config.get('NEST_APP_THROTTLE_TTL') || 60000, // time-to-live 每个请求计数记录的生存时间（秒）
            limit: config.get('NEST_APP_THROTTLE_LIMIT') || 60 // 给定时间段内允许的最大请求数
          }
        ]
      }),
      I18nModule.forRootAsync({
        useFactory: (configService: ConfigService) => ({
          fallbackLanguage: configService.get('NEST_APP_I18N_DEFAULT') || 'zh',
          loaderOptions: {
            path: join(__dirname, '/i18n/'),
            watch: true
          }
        }),
        resolvers: [
          { use: QueryResolver, options: ['lang'] },
          AcceptLanguageResolver,
          new HeaderResolver(['x-lang'])
        ],
        inject: [ConfigService]
      }),
      RedisModule,
      OSSModule,
      PrismaModule,
      MailerModule,
      // Backend
      ApiLoggerModule,
      AdminModule,
      UserModule,
      AuthModule,
      EmailConfigModule,
      EmailTemplateModule,
      EmailLogModule,
      SystemLogModule,
      RegionModule,
      CategoryModule,
      UrlKeyModule,
      BannerModule,
      CmsModule,
      CategoryModule,
      // Storefront
      StoreAuthModule,
      StoreUserModule,
      StoreCmsModule,
      StoreRegionModule
    ]
    const providers: Provider[] = [
      {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: HttpStatusIntercepter
      },
      AppService
    ]

    return {
      module: AppModule,
      imports,
      controllers,
      providers
    }
  }
}
