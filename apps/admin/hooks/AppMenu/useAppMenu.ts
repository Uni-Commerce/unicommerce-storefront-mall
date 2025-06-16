import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { events } from '@unicommerce/utils'

import { permissions } from '@/config/permisson'

interface MenuInfo {
  key: string
  keyPath: string[]
}

export const useAppMenu = () => {
  const { pathname } = useLocation()
  const isMobile = useMediaQuery({ query: '(max-width: 992px)' })
  const userRole = useSelector((state: Store) => state.user.userRole)
  const [openKeys, setOpenKeys] = useState<string[]>([''])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([''])

  const modules: string[] = useMemo(() => {
    const result = permissions.find((item) => item.name === userRole)
    return result?.modules ?? []
  }, [userRole])

  const handleOnClick = ({ key }: MenuInfo) => {
    setSelectedKeys([key])
  }

  const handleRedirect = () => {
    if (isMobile) events.emit('onCloseMenu')
  }

  const handleOnOpen = (keys: string[]) => {
    setOpenKeys([...keys])
  }

  useEffect(() => {
    const routerName: string = pathname.split('?')?.[1] ?? pathname
    const parts = routerName.split('/')
    if (parts.length > 2) setOpenKeys([`/${parts[1]}`])
    setSelectedKeys([routerName])
  }, [pathname])

  return {
    modules,
    openKeys,
    selectedKeys,
    handleOnClick,
    handleOnOpen,
    handleRedirect
  }
}
