import { Injectable } from '@nestjs/common'

@Injectable()
export class SecureNameService {
  maskCompanyName(name: string) {
    if (name.length <= 4) {
      return '****'
    }

    const visiblePrefix: number = 2
    const visibleSuffix: number = 2
    const maskedPart = '*'.repeat(name.length - visiblePrefix - visibleSuffix)

    return (
      name.substring(0, visiblePrefix) + maskedPart + name.substring(name.length - visibleSuffix)
    )
  }
}
