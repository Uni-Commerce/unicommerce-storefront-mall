import { PrismaClient, AdminRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const main = async () => {
  const hash = 10
  const password = await bcrypt.hash('12345Abc', hash)
  const admins: any[] = [
    {
      email: '454451758@qq.com',
      password,
      name: '罗蓝',
      telephone: '13699094943',
      role: AdminRole.SYSTEM,
      disabled: false
    },
  ]
  const emailConifg = {
    host: 'smtp.qq.com',
    port: 465,
    hostUser: '364062565@qq.com',
    hostPassword: 'tvaukrafvpaubjed',
    from: '364062565@qq.com',
    secure: true,
    preview: true
  }

  for (const admin of admins) {
    await prisma.admin.upsert({
      where: { email: admin.email },
      update: {
        email: admin.email,
        name: admin.name,
        password: admin.password,
        telephone: admin.telephone,
        role: admin.role,
        disabled: admin.disabled
      },
      create: {
        email: admin.email,
        name: admin.name,
        password: admin.password,
        telephone: admin.telephone,
        role: admin.role,
        disabled: admin.disabled
      }
    })
  }

  await prisma.emailConfig.upsert({
    where: {
      hostUser: emailConifg.hostUser
    },
    update: {
      host: emailConifg.host,
      port: emailConifg.port,
      hostUser: emailConifg.hostUser,
      hostPassword: emailConifg.hostPassword,
      from: emailConifg.from,
      protocol: 'tls',
      secure: emailConifg.secure,
      preview: emailConifg.preview
    },
    create: {
      host: emailConifg.host,
      port: emailConifg.port,
      hostUser: emailConifg.hostUser,
      hostPassword: emailConifg.hostPassword,
      from: emailConifg.from,
      protocol: 'tls',
      secure: emailConifg.secure,
      preview: emailConifg.preview
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
