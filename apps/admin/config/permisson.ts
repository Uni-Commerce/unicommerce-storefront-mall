type PermissionType = {
  name: string
  modules: string[]
}

export const permissions: PermissionType[] = [
  {
    name: 'SYSTEM',
    modules: [
      'wechat',
      'banner',
      'urlKey',
      'cms',
      'category',
      'industry',
      'tag',
      'post',
      'auth',
      'store',
      'subsribe',
      'categoryService',
      'admin',
      'region',
      'account',
      'email',
      'users',
      'system',
      'emailLog',
      'newsletter'
    ]
  },
  {
    name: 'ADMIN',
    modules: [
      'wechat',
      'banner',
      'urlKey',
      'cms',
      'category',
      'industry',
      'tag',
      'post',
      'auth',
      'store',
      'subsribe',
      'categoryService',
      'admin',
      'region',
      'account',
      'email',
      'users',
      'system',
      'emailLog',
      'newsletter'
    ]
  },
  {
    name: 'REVIEWER',
    modules: [
      'wechat',
      'banner',
      'urlKey',
      'cms',
      'category',
      'industry',
      'tag',
      'post',
      'auth',
      'store',
      'subsribe',
      'categoryService',
      'admin',
      'region',
      'account',
      'emailLog',
      'newsletter'
    ]
  }
]
