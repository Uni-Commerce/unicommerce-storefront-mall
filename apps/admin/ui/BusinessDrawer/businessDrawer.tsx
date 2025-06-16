import { forwardRef, lazy } from 'react'
import type { ReactNode } from 'react'
import type { DrawerProps } from 'antd/es/drawer'

const ForwardedRef = lazy(() => import('./forwardedRef'))

interface BusinessDrawerProps extends Omit<DrawerProps, 'children' | 'title'> {
  children?: ReactNode
  title?: ReactNode | string
  afterClose?: () => void
}

const BusinessDrawer = forwardRef((props: BusinessDrawerProps, ref: any) => (
  <ForwardedRef {...props} forwardedRef={ref} />
))

export default BusinessDrawer
