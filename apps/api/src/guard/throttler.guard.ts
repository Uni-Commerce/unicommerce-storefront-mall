import { Injectable, ExecutionContext } from '@nestjs/common'
import { ThrottlerGuard as NestThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class ThrottlerGuard extends NestThrottlerGuard {
  protected getErrorMessage(context: ExecutionContext): Promise<string> {
    const argumentContext = context.switchToHttp()
    // const response = argumentContext.getResponse<Response>()
    const request = argumentContext.getRequest<Request>()
    console.info('limit api url: ', request.url)
    return Promise.resolve('You have exceeded the rate limit. Please try again later.')
  }
}
