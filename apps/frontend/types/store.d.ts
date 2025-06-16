type Store = {
  app: {
    i18n: {
      locale: string
      messages: object
    }
    loading: boolean
    industryList: Array<{
      id: string
      name: string
      icon: string
    }>
    location: any
    isWechat: boolean
  }
  user: {
    isLogin: boolean
    token: any | null
    userDetail: any | null
    userRole: string
  }
}
