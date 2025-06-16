import { HttpStatusIntercepter } from './http-status.interceptor'

describe('HttpStatusIntercepter', () => {
  it('should be defined', () => {
    expect(new HttpStatusIntercepter()).toBeDefined()
  })
})
