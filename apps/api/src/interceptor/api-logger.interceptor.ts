import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Request } from 'express'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ApiLoggerInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const { method, headers, url, body, params, query, ip } = request
    const userAgent: string = headers['user-agent'] as string
    const admin: any = (request as any)?.admin ?? {}
    const logger: string[] = ['/api/v1/api-logger']
    const before = Date.now()

    console.info(`Request from IP: ${ip}, User-Agent: ${userAgent}`)
    console.info(
      `Incoming Request - Method: ${method}, URL: ${url}, Body: ${JSON.stringify(
        body
      )}, Params: ${JSON.stringify(params)}, Query: ${JSON.stringify(query)}`
    )

    return next.handle().pipe(
      tap(() => console.info(`Outgoing Response - Method: ${method}, URL: ${url}`)),
      tap(async () => {
        if (!logger.includes(url)) {
          const after = Date.now()
          const executionTime = after - before
          // Example: Logging request after each request
          const input: any = {
            ip,
            userAgent,
            method,
            url,
            body,
            params,
            query,
            time: `${executionTime}ms`
          }

          if (admin?.id) input.adminId = admin?.id ?? ''

          await this.prisma.apiLogger.create({
            data: input
          })
        }
      })
    )
  }
}
