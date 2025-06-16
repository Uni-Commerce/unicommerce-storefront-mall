import { Injectable } from '@nestjs/common'
import { uid } from 'uid'

@Injectable()
export class UidService {
  async getUid(length: number): Promise<string> {
    return uid(length)
  }
}
