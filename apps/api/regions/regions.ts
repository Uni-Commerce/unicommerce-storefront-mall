import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'
import path from 'node:path'

const prisma = new PrismaClient()

interface SeedRegion {
  code: string
  name: string
  level: number
  parentCode?: string
}

const main = async () => {
  console.info('开始导入地区数据...')

  // 读取转换后的数据
  const dataPath = path.join(__dirname, 'regions-seed.json')
  const regionsData: SeedRegion[] = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))

  // 创建地区码到ID的映射
  const regionCodeToId = new Map<string, number>()
  // 按层级顺序导入
  for (let level = 1; level <= 3; level++) {
    console.info(`正在导入 ${level} 级数据...`)

    const levelRegions = regionsData.filter((r) => r.level === level)

    for (const region of levelRegions) {
      const parentId = region.parentCode ? regionCodeToId.get(region.parentCode) : null

      const created = await prisma.region.upsert({
        where: { code: region.code },
        update: {},
        create: {
          code: region.code,
          name: region.name,
          level: region.level,
          parentId: parentId || undefined
        }
      })

      regionCodeToId.set(region.code, Number(created.id))
    }
  }

  console.info('地区数据导入完成')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
