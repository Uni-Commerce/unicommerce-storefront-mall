import { Injectable } from '@nestjs/common'

@Injectable()
export class RandomService {
  getRandomElement<T>(array: T[]): T {
    if (!array || array.length === 0) {
      throw new Error('Array is empty or undefined')
    }
    return array[Math.floor(Math.random() * array.length)]
  }
}
