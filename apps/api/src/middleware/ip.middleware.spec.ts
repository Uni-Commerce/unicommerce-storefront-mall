import { RealIpMiddleware } from './ip.middleware'

describe('RealIpMiddleware', () => {
  it('should be defined', () => {
    expect(new RealIpMiddleware()).toBeDefined()
  })
})
