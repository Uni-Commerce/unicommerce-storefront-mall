import { lazy } from 'react'
import type { LazyExoticComponent } from 'react'

export interface Routes {
  path: string
  component: LazyExoticComponent<any>
  children: Routes[]
  redirect?: boolean
  isPublic?: boolean
  moduleName?: string
}

export const routes: Routes[] = [
  {
    path: '/',
    component: lazy(() => import('@/components/AppDashboard')),
    children: [
      {
        path: '/',
        component: lazy(() => import('@/pages/home')),
        children: []
      },
      {
        path: '*',
        component: lazy(() => import('@/pages/not-found')),
        children: []
      }
    ]
  },
  {
    path: '/login',
    component: lazy(() => import('@/pages/login')),
    children: [],
    isPublic: true
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('@/pages/forgot-password')),
    children: [],
    isPublic: true
  }
]
