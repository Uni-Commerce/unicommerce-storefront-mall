import { CallHandler, ExecutionContext, Injectable, HttpStatus } from '@nestjs/common'
import { map } from 'rxjs/operators'

@Injectable()
export class HttpStatusIntercepter {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const res = ctx.getResponse()
    const type = ctx['contextType'] as any

    return next.handle().pipe(
      map((value) => {
        if (['http', 'https'].includes(type)) {
          if (req.method === 'POST') {
            if (res.statusCode === HttpStatus.CREATED) {
              res.status(HttpStatus.OK)
            }
          }
        }

        return value
      })
    )
  }
}
