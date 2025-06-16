interface TruncateOptions {
  keepImageTag?: boolean
  truncateLastWord?: boolean
  slop?: number
  ellipsis?: boolean | string
}

export const truncate = (str: string, maxLength: number, options?: TruncateOptions): string => {
  const DEFAULT_TRUNCATE_SYMBOL = '...'
  const DEFAULT_SLOP = Math.min(10, maxLength)
  const EXCLUDE_TAGS = ['img', 'br']
  const items: string[] = []
  let total = 0
  let content = ''

  // 修正正则表达式
  const KEY_VALUE_REGEX = '([\\w|-]+\\s*=\\s*"[^"]*"\\s*)*'
  const IS_CLOSE_REGEX = '\\s*/?\\s*'
  const CLOSE_REGEX = '\\s*/\\s*'
  const SELF_CLOSE_REGEX = new RegExp(`</?\\w+\\s*${KEY_VALUE_REGEX}${CLOSE_REGEX}>`)
  const HTML_TAG_REGEX = new RegExp(`</?\\w+\\s*${KEY_VALUE_REGEX}${IS_CLOSE_REGEX}>`)
  // const URL_REGEX =
  //   /(((ftp|https?):\/\/)[-\w@:%_+.~#?,&/=]+)|((mailto:)?[_.\w-]+@([\w][\w-]+\.)+[a-zA-Z]{2,3})/g
  const IMAGE_TAG_REGEX = new RegExp(`<img\\s*${KEY_VALUE_REGEX}${IS_CLOSE_REGEX}>`)
  const WORD_BREAK_REGEX = /\W+/g

  // 合并选项
  const opts = {
    ellipsis: DEFAULT_TRUNCATE_SYMBOL,
    truncateLastWord: true,
    slop: DEFAULT_SLOP,
    ...options
  }

  // 移除图片标签
  const removeImageTag = (s: string) => {
    return s.replace(IMAGE_TAG_REGEX, '')
  }

  // 生成闭合标签
  const dumpCloseTags = (tags: string[]) => {
    return tags
      .reverse()
      .filter((tag) => !EXCLUDE_TAGS.includes(tag))
      .map((tag) => `</${tag}>`)
      .join('')
  }

  // 获取标签名
  const getTagName = (tagStr: string) => {
    const spaceIdx = tagStr.indexOf(' ')
    const closeIdx = tagStr.indexOf('>')

    if (spaceIdx === -1 && closeIdx === -1) {
      throw new Error(`Malformed HTML tag: ${tagStr}`)
    }

    const end = spaceIdx === -1 ? closeIdx : spaceIdx
    return tagStr.substring(1, end).toLowerCase()
  }

  // 获取截断位置
  const getTruncatePosition = (s: string, tailPos?: number) => {
    const defaultPos = maxLength - total
    let position = defaultPos

    if (!opts.truncateLastWord) {
      const start = Math.max(0, defaultPos - opts.slop)
      const end = tailPos ?? Math.min(s.length, defaultPos + opts.slop)
      const substring = s.slice(start, end)

      let result: RegExpExecArray | null
      while ((result = WORD_BREAK_REGEX.exec(substring)) !== null) {
        if (result.index <= defaultPos - start) {
          position = start + result.index
        } else {
          position = start + result.index
          break
        }
      }

      if (position > 0 && s[position - 1].match(/\s/)) {
        position--
      }
    }

    return Math.min(position, s.length)
  }

  let remaining = str

  while (remaining.length > 0 && total < maxLength) {
    const tagMatch = HTML_TAG_REGEX.exec(remaining)

    if (!tagMatch) {
      // 处理纯文本
      const truncPos = getTruncatePosition(remaining)
      content += remaining.substring(0, truncPos)
      total += truncPos
      remaining = remaining.substring(truncPos)
      break
    }

    const [fullTag] = tagMatch
    const tagIndex = tagMatch.index

    // 处理标签前的文本
    if (tagIndex > 0) {
      const text = remaining.substring(0, tagIndex)
      const availLength = maxLength - total

      if (text.length > availLength) {
        content += text.substring(0, getTruncatePosition(text))
        total += availLength
        break
      }

      content += text
      total += text.length
    }

    // 处理标签
    if (fullTag.startsWith('</')) {
      // 闭合标签
      items.pop()
    } else if (!SELF_CLOSE_REGEX.test(fullTag)) {
      // 开放标签
      const tagName = getTagName(fullTag)
      if (!EXCLUDE_TAGS.includes(tagName)) {
        items.push(tagName)
      }
    }

    content += fullTag
    remaining = remaining.substring(tagIndex + fullTag.length)
  }

  // 添加省略号
  if (total >= maxLength && opts.ellipsis) {
    content += typeof opts.ellipsis === 'string' ? opts.ellipsis : DEFAULT_TRUNCATE_SYMBOL
  }

  // 添加闭合标签
  content += dumpCloseTags(items)

  // 可选移除图片标签
  if (!opts.keepImageTag) {
    content = removeImageTag(content)
  }

  return content
}
