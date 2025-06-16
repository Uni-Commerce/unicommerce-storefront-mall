import { Injectable } from '@nestjs/common'

@Injectable()
export class Base64Service {
  urlSafeEncode(str: string) {
    const b64 = btoa(str)
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
  }

  urlSafeDecode(safeB64: string) {
    // eslint-disable-next-line no-useless-escape
    const replaceB64 = safeB64.replace(/\-/g, '+').replace(/\_/g, '/')
    const padLength = replaceB64.length % 4 ? 4 - (replaceB64.length % 4) : 0
    const b64 = replaceB64.padEnd(replaceB64.length + padLength, '=')
    return atob(b64)
  }
}
