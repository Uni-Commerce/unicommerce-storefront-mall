import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const type = ctx['contextType'] as any
    const request = ctx.getRequest()

    // 跳过微信相关接口
    if (request.url.includes('/wechat')) {
      return next.handle()
    }

    return next.handle().pipe(
      map((value) => {
        if (['http', 'https'].includes(type)) {
          return (
            value?.render || {
              status: 200,
              data: value?.data || value,
              meta: {
                message: 'success',
                ...(value?.data && value?.meta)
              }
            }
          )
        }
        return value
      })
    )
  }
}
