type Store = {
  app: {
    i18n: {
      locale: string
      messages: object
    }
    loading: boolean
    isWechat: boolean
  }
  user: {
    isLogin: boolean
    token: any | null
    userDetail: any | null
    userRole: string
  }
}
