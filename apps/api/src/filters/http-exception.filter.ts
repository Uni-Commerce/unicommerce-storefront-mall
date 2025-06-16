import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  Logger
} from '@nestjs/common'
import { Response, Request } from 'express'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

/**
 * 捕获 HTTP 相关异常
 */
@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  catch(exception: T, host: ArgumentsHost) {
    const contxt = host.switchToHttp()
    const response = contxt.getResponse<Response>()
    const request = contxt.getRequest<Request>()
    const status = (exception as any)?.response?.statusCode ?? (exception as any)?.status
    const httpMessage = (exception as any)?.response?.message ?? (exception as any)?.response

    this.logger.error(exception)

    response.status(status).json({
      data: null,
      status,
      extra: {
        timestamp: new Date().toISOString(),
        path: request.url
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        message: httpMessage
      }
    })
  }
}
