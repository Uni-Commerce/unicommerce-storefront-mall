import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseFormDataJsonPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value)
      } catch (_) {
        throw new BadRequestException('Invalid JSON in form data')
      }
    }
    return value
  }
}
