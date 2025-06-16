import { useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'
import type { ReactNode } from 'react'
import type { ModalProps } from 'antd/es/modal'

export type BusinessModalRef = React.Ref<{
  open: () => void
  close: () => void
}>

interface ForwardedRefProps extends Omit<ModalProps, 'children' | 'title'> {
  children?: ReactNode
  title?: ReactNode | string
  forwardedRef?: any
}

const ForwardedRef = ({ children, title, forwardedRef, ...props }: ForwardedRefProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOK = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
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
    <Modal
      footer={null}
      getContainer={false}
      destroyOnClose
      centered
      title={title}
      {...props}
      open={open}
      onOk={handleOK}
      onCancel={handleCancel}>
      {children}
    </Modal>
  )
}

export default ForwardedRef
