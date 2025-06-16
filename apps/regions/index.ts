import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'

// 重试配置
const RETRY_LIMIT: number = 3
const RETRY_DELAY: number = 1000

const fetchWithRetry = async (url: string, retries = RETRY_LIMIT) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000
    })
    return response.data
  } catch (error) {
    if (retries <= 0) throw error
    await new Promise((res) => setTimeout(res, RETRY_DELAY))
    return fetchWithRetry(url, retries - 1)
  }
}

const bootstrap = async () => {
  const result: any = { '86': {} }
  const cacheDir = path.join(__dirname, 'cache')

  // 创建缓存目录
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }

  try {
    // 1. 获取省级数据
    const provinceData = await fetchWithRetry(
      'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full'
    )

    // 2. 使用for...of替代forEach，以便正确处理异步
    for (const [index, feature] of provinceData.features.entries()) {
      const pCode = feature.properties.adcode
      const pName = feature.properties.name

      if (pName) {
        result['86'][pCode] = pName
        console.info(`[${index + 1}/${provinceData.features.length}] 处理 ${pName}...`)

        if (pName === '台湾省') continue
        result[pCode] = {}

        try {
          // 3. 获取市级数据
          const cityData = await fetchWithRetry(
            `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${pCode}_full`
          )
          // 处理每个城市
          for (const cFeature of cityData.features) {
            const cCode = cFeature.properties.adcode
            const cName = cFeature.properties.name
            result[pCode][cCode] = cName

            if (cName.indexOf('区') < 0) {
              try {
                // 4. 获取区县数据
                const districtData = await fetchWithRetry(
                  `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${cCode}_full`
                )
                // 处理每个区县
                result[cCode] = {}
                for (const dFeature of districtData.features) {
                  result[cCode][dFeature.properties.adcode] = dFeature.properties.name
                }
              } catch (error) {
                console.error(
                  `获取区县数据失败 ${cName}:`,
                  error instanceof Error ? error.message : error
                )
              }
            }
          }

          // 5. 每个省份处理完后实时保存进度
          fs.writeFileSync(
            path.join(cacheDir, `progress_${pCode}.json`),
            JSON.stringify(result, null, 2),
            'utf8'
          )
        } catch (error) {
          console.error(
            `获取城市数据失败 ${pName}:`,
            error instanceof Error ? error.message : error
          )
        }
      }
    }

    // 6. 最终保存
    const outputPath = path.join(__dirname, 'regions.json')
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8')
    fs.rmSync(cacheDir, { recursive: true, force: true }) // 删除缓存目录

    console.info(`✅ 数据已保存至 ${outputPath}`)
    return result
  } catch (error) {
    console.error('❌ 处理失败:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// 执行
bootstrap()
