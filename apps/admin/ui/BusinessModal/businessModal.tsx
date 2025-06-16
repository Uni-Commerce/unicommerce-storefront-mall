import { forwardRef, lazy } from 'react'
import type { ReactNode } from 'react'
import type { ModalProps } from 'antd/es/modal'

const ForwardedRef = lazy(() => import('./forwardedRef'))

interface BusinessModalProps extends Omit<ModalProps, 'children' | 'title'> {
  children?: ReactNode
  title?: ReactNode | string
}

const BusinessModal = forwardRef((props: BusinessModalProps, ref: any) => (
  <ForwardedRef {...props} forwardedRef={ref} />
))

export default BusinessModal
