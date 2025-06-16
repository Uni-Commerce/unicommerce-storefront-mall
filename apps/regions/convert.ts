import fs from 'node:fs'
import rawData from './regions.json'

const convertData = (data: any) => {
  const result = []

  // 处理省级
  for (const [code, name] of Object.entries(data['86'])) {
    result.push({
      code,
      name,
      level: 1
    })

    // 处理市级
    const cityData = data[code] || {}
    for (const [cityCode, cityName] of Object.entries(cityData)) {
      result.push({
        code: cityCode,
        name: cityName,
        level: 2,
        parentCode: code
      })

      // 处理县级
      const countyData = data[cityCode] || {}
      for (const [countyCode, countyName] of Object.entries(countyData)) {
        result.push({
          code: countyCode,
          name: countyName,
          level: 3,
          parentCode: cityCode
        })
      }
    }
  }

  return result
}

const bootstrap = async () => {
  try {
    console.info('开始转换数据...')
    const convertedData = convertData(rawData)
    fs.writeFileSync('regions-seed.json', JSON.stringify(convertedData, null, 2))
    console.info('✅ 数据转换完成，已保存为 regions-seed.json')
  } catch (error) {
    console.error('❌ 处理失败:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

bootstrap()
