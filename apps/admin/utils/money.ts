export const amountToCNCharacter = (num: number) => {
  if (isNaN(num)) return '无效金额'
  if (num === 0) return '零元整'

  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿', '兆']

  const yuan = Math.floor(num) // 元
  const fraction = Math.round((num - yuan) * 100) // 分

  let result = ''

  // 处理整数部分（元）
  if (yuan > 0) {
    const strYuan = yuan.toString()
    const groupCount = Math.ceil(strYuan.length / 4)
    let zeroFlag = false

    for (let i = 0; i < groupCount; i++) {
      const start = Math.max(0, strYuan.length - (i + 1) * 4)
      const end = strYuan.length - i * 4
      const group = strYuan.slice(start, end)

      let groupStr = ''
      let zeroInGroup = false

      for (let j = 0; j < group.length; j++) {
        const digit = parseInt(group[j])
        if (digit === 0) {
          zeroInGroup = true
          continue
        }
        if (zeroInGroup && groupStr !== '') {
          groupStr += digits[0]
          zeroInGroup = false
        }
        groupStr += digits[digit] + units[group.length - j - 1]
      }

      if (groupStr !== '') {
        groupStr += bigUnits[i]
        if (zeroFlag) {
          result = digits[0] + result
          zeroFlag = false
        }
        result = groupStr + result
      } else {
        zeroFlag = true
      }
    }

    result += '元'
  }

  // 处理小数部分（角和分）
  if (fraction > 0) {
    const jiao = Math.floor(fraction / 10) // 角
    const fen = fraction % 10 // 分

    if (jiao > 0) {
      result += digits[jiao] + '角'
    }
    if (fen > 0) {
      result += digits[fen] + '分'
    }
  } else if (yuan > 0) {
    result += '整'
  }

  return result || '零元整'
}
