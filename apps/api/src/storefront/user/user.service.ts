import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '@/prisma/prisma.service'
import { RedisService } from '@/redis/redis.service'
import { SmsService } from '@/sms/sms.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { UpdatePhoneDto } from './dto/update-phone.dto'
import { PhoneDto } from './dto/phone.dto'

@Injectable()
export class StoreUserService {
  private readonly VERIFICATION_CODE_EXPIRE = 300 // 5分钟

  constructor(
    private readonly i18n: I18nService,
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly smsService: SmsService
  ) {}

  async requsetSmsCode(type: string, telephone: string, templateCode: string): Promise<boolean> {
    // 检查发送频率
    const lastSentKey = `${type}:${telephone}:last_sent`
    const lastSent = await this.redisService.get(lastSentKey)

    if (lastSent && Date.now() - parseInt(lastSent) < 60000) {
      throw new BadRequestException('请求过于频繁，请稍后再试')
    }

    // 生成验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // 发送短信
    const sent = await this.smsService.sendVerificationCode(telephone, code, templateCode)
    if (!sent) {
      throw false
    }

    // 存储验证码和发送时间
    await Promise.all([
      this.redisService.set(`${type}:${telephone}`, code, this.VERIFICATION_CODE_EXPIRE),
      this.redisService.set(lastSentKey, Date.now().toString(), 60) // 1分钟冷却
    ])
    return true
  }

  async verifySmsCode(type: string, telephone: string, code: string): Promise<boolean> {
    const storedCode = await this.redisService.get(`${type}:${telephone}`)
    return storedCode === code
  }

  async update(user: any, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: {
        id: Number(user.id)
      },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        discription: updateUserDto.discription,
        subscribed: updateUserDto.subscribed
      }
    })
    return updateUser
  }

  async modifyPassword(user: User, updatePasswordDto: UpdatePasswordDto) {
    const { password, newPassword, confirmPassword } = updatePasswordDto

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password')
    }

    if (password === newPassword) {
      throw new BadRequestException('New password cannot be the same as the old password')
    }
    if (confirmPassword !== newPassword) {
      throw new BadRequestException('New password and confirm password do not match')
    }

    const hash: number = 10
    const encryptNewPassword: string = await bcrypt.hash(newPassword, hash)
    const newUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        password: encryptNewPassword
      }
    })

    return newUser
  }

  async requsetPhoneCode(data: PhoneDto): Promise<boolean> {
    const { telephone } = data
    const exsistUser = await this.prisma.user.findFirst({
      where: {
        telephone: telephone
      }
    })
    if (exsistUser) {
      throw new NotFoundException(
        this.i18n.t('user.telephoneExisted', {
          args: {
            telephone: telephone
          }
        })
      )
    }
    const result = await this.requsetSmsCode('phone', telephone, 'SMS_486400040')
    return result
  }

  async modifyPhone(user: User, updatePhoneDto: UpdatePhoneDto) {
    const { telephone, verificationCode } = updatePhoneDto

    // 验证验证码
    const isValid = await this.verifySmsCode('phone', telephone, verificationCode)
    if (!isValid) {
      throw new BadRequestException('验证码无效或已过期')
    }

    if (telephone === user.telephone) {
      throw new BadRequestException('New telephone cannot be the same as the old telephone')
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        telephone: telephone
      }
    })
    return updateUser
  }
}
