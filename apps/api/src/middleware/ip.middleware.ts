import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RealIpMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    // 定义IP获取的优先级
    const potentialIps = [
      req.headers['x-original-client-ip'], // Next.js设置的特殊头
      req.headers['x-real-ip'], // Nginx设置
      this.getFirstIp(req.headers['x-forwarded-for']), // 代理链
      req.connection?.remoteAddress, // 直接连接信息
      req.socket?.remoteAddress
    ]

    // 找到第一个有效的IP地址
    let clientIp = potentialIps.find((ip) => ip && typeof ip === 'string')

    // 处理数组情况（某些头可能是数组）
    if (Array.isArray(clientIp)) {
      clientIp = clientIp[0]
    }

    // 清理IP地址（IPv6转IPv4等）
    clientIp = this.cleanIp(clientIp)

    // 存储到请求对象
    req['clientIp'] = clientIp || 'unknown'
    next()
  }

  private getFirstIp(forwardedFor: string | string[] | undefined): string | undefined {
    if (!forwardedFor) return undefined

    const ips =
      typeof forwardedFor === 'string'
        ? forwardedFor.split(',').map((ip) => ip.trim())
        : forwardedFor.flatMap((ip) => ip.split(',').map((i) => i.trim()))

    return ips.length > 0 ? ips[0] : undefined
  }

  private cleanIp(ip?: string): string | undefined {
    if (!ip) return ip

    // 处理IPv6转IPv4 (::ffff:192.168.1.1 → 192.168.1.1)
    if (ip.startsWith('::ffff:')) {
      return ip.substring(7)
    }

    // 处理端口号 (192.168.1.1:12345 → 192.168.1.1)
    const portIndex = ip.lastIndexOf(':')
    if (portIndex > ip.lastIndexOf(']')) {
      // 避免IPv6地址中的冒号
      return ip.substring(0, portIndex)
    }

    return ip
  }
}
