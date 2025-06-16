import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useCookie } from '@unicommerce/hooks'
import { actions as appActions } from '@/store/app'
import { actions as userActions } from '@/store/user'

export const useAppLogout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cookie } = useCookie()
  const userDetail = useSelector((state: Store) => state.user.userDetail)

  const userName = useMemo(() => {
    return userDetail?.name ?? ''
  }, [userDetail])

  const handleLogout = () => {
    cookie.removeItem('access_token')
    cookie.removeItem('refresh_token')
    dispatch(userActions.setInitialState({}))
    navigate('/login')
  }

  const handleToPassword = () => {
    navigate('/account-password')
  }

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    const query = window.location.search
    const isWeixin = /micromessenger/.test(ua)
    const fromMenu = /from=singlemessage|menu/.test(query)

    if (isWeixin || fromMenu) dispatch(appActions.setIsWechat(true))
  }, [])

  return {
    userName,
    handleLogout,
    handleToPassword
  }
}
