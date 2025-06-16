export class TimeUtils {
  /**
   * 验证时间格式 (hh:mm)
   */
  static isValidFormat(time: string): boolean {
    return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time)
  }

  /**
   * 将 hh:mm 转换为分钟数 (方便比较)
   */
  static toMinutes(time: string): number {
    const [hh, mm] = time.split(':').map(Number)
    return hh * 60 + mm
  }

  /**
   * 验证时间段有效性 (开始 < 结束)
   */
  static isSlotValid(start: string, end: string): boolean {
    return this.toMinutes(end) > this.toMinutes(start)
  }

  /**
   * 格式化分钟数为 hh:mm
   */
  static formatFromMinutes(minutes: number): string {
    const hh = Math.floor(minutes / 60)
      .toString()
      .padStart(2, '0')
    const mm = (minutes % 60).toString().padStart(2, '0')
    return `${hh}:${mm}`
  }
}
