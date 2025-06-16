import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { events } from '@unicommerce/utils'
import { theme } from 'antd'

export const useAppDashboard = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  const handleOnToggle = () => setCollapsed(!collapsed)

  useEffect(() => {
    setCollapsed(isMobile)
  }, [isMobile])

  useEffect(() => {
    const onCloseMenu = () => {
      setCollapsed(true)
    }

    events.on('onCloseMenu', onCloseMenu)
    return () => {
      events.off('onCloseMenu', onCloseMenu)
    }
  }, [])

  return {
    collapsed,
    colorBgContainer,
    borderRadiusLG,
    isMobile,
    handleOnToggle
  }
}
