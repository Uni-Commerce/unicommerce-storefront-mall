import type { Theme as EmotionTheme } from '@emotion/react'

declare module '@emotion/react' {
  export interface Theme extends EmotionTheme {
    colors: {
      white: string
      black: string
      primary: string
      green: string
    }
    breakPoint: {
      xxs: number
      xs: number
      s: number
      sm: number
      m: number
      l: number
      lg: number
      xl: number
      xxl: number
      xxxl: number
    }
    namespace: string
  }
}
