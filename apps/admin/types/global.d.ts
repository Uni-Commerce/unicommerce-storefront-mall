interface ArgsProps {
  message: React.ReactNode
  description?: React.ReactNode
  btn?: React.ReactNode
  key?: React.Key
  onClose?: () => void
  duration?: number | null
  icon?: React.ReactNode
  placement?: NotificationPlacement
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  closeIcon?: React.ReactNode
  closable?: ClosableType
  props?: DivProps
  role?: 'alert' | 'status'
}

interface BaseMethods {
  open: (config: ArgsProps) => void
  destroy: (key?: React.Key) => void
  config: (config: GlobalConfigProps) => void
}

type StaticFn = (config: ArgsProps) => void

interface NoticeMethods {
  success: StaticFn
  info: StaticFn
  warning: StaticFn
  error: S
}

interface Window {
  notification: NoticeMethods & BaseMethods
}
