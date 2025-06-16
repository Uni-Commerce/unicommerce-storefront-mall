import { useImperativeHandle, useState } from 'react'
import { Drawer } from 'antd'
import type { ReactNode } from 'react'
import type { DrawerProps } from 'antd/es/drawer'

export type BusinessDrawerRef = React.Ref<{
  open: () => void
  close: () => void
}>

interface ForwardedRefProps extends Omit<DrawerProps, 'children' | 'title'> {
  children?: ReactNode
  title?: ReactNode | string
  forwardedRef?: any
  afterClose?: () => void
}

const ForwardedRef = ({
  children,
  title,
  forwardedRef,
  afterClose = () => {},
  ...props
}: ForwardedRefProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOK = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
    afterClose?.()
  }

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: handleOK,
      close: handleCancel
    }),
    []
  )

  return (
    <Drawer
      footer={null}
      getContainer={false}
      destroyOnClose
      title={title}
      {...props}
      open={open}
      onClose={handleCancel}>
      {children}
    </Drawer>
  )
}

export default ForwardedRef
