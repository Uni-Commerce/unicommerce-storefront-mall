export const getTimeRange = (key: string, now: Date) => {
  let startDateFilter: Date

  // timeRange 是 'week', 'month', 'quarter' 或 'year'
  switch (key) {
    case 'week':
      startDateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) // 7天前
      break
    case 'month':
      startDateFilter = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()) // 1个月前
      break
    case 'quarter':
      startDateFilter = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()) // 3个月前
      break
    case 'year':
      startDateFilter = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()) // 1 year ago
      break
    default:
      startDateFilter = new Date(0) // 默认返回所有
  }

  return startDateFilter
}
