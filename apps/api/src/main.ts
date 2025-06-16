import { NestFactory, HttpAdapterHost, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, Logger, VersioningType, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { I18nMiddleware } from 'nestjs-i18n'
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { join } from 'node:path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import type { NestExpressApplication } from '@nestjs/platform-express'
import './app.ployfill'

import { HttpExceptionFilter } from '@/filters/http-exception.filter'
import { PrismaExceptionFilter } from '@/filters/prisma-exception.filter'
import { TransformInterceptor } from '@/interceptor/transform.interceptor'
import { AppModule } from './app.module'

const bootstrap = async () => {
  // 设置时区为东八区
  process.env.TZ = 'Asia/Shanghai'

  const apiPrefix: string = 'api'
  const port: number = parseInt(process.env.NEST_APP_PORT, 10) || 3005
  const host: string = process.env.NEST_APP_HOST || '127.0.0.1'
  const app = await NestFactory.create<NestExpressApplication>(AppModule.register(), {
    cors: true,
    rawBody: true
  })
  const { httpAdapter } = app.get(HttpAdapterHost)
  // 启用信任代理
  app.set('trust proxy', true)
  app.setGlobalPrefix(apiPrefix)
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })
  app.useStaticAssets(join(__dirname, '../', 'public'), {
    prefix: '/static'
  })
  if (process.env.NODE_ENV !== 'development') {
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  }
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter))
  app.useGlobalFilters(new HttpExceptionFilter(app.get(WINSTON_MODULE_PROVIDER) as Logger))
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true
    })
  )
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.use(cookieParser())
  // 添加XML解析中间件
  app.use(bodyParser.text({ type: ['text/xml', 'application/xml'] }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(I18nMiddleware)

  const config = new DocumentBuilder()
    .setTitle('Uni Commerce')
    .setDescription('Uni Commerce Rest API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.enableCors()
  await app.listen(port, host, () => {
    console.info(`
    🚀 Server ready at: http://${host}:${port}/
    ⭐️ See sample swagger api: http://${host}:${port}/${apiPrefix}
  `)
  })
}

bootstrap()
