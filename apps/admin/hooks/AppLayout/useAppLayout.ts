import { useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFetch } from '@unicommerce/http'
import { useDispatch, useSelector } from 'react-redux'
import { useCookie } from '@unicommerce/hooks'

import { whiteRoutes } from '@/config/route'
import { actions as userActions } from '@/store/user'

export const useAppLayout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cookie } = useCookie()
  const { pathname } = useLocation()
  const { formatMessage } = useIntl()
  const { get, response } = useFetch()
  const isLogin = useSelector((state: Store) => state.user.isLogin)
  const userDetail = useSelector((state: Store) => state.user.userDetail)

  const waterContent = useMemo(() => {
    return userDetail?.name ? `Unimall Admin--${userDetail?.name}` : 'Unimall Admin'
  }, [userDetail])

  useEffect(() => {
    const accessToken: string = cookie.getItem('access_token')
    const refreshToken: string = cookie.getItem('refresh_token')

    if (!accessToken && !refreshToken) {
      if (pathname !== '/login') {
        if (!whiteRoutes.includes(pathname)) {
          navigate('/login')
        }
      }
    }
  }, [pathname])

  useEffect(() => {
    const accessToken: string = cookie.getItem('access_token')
    const refreshToken: string = cookie.getItem('refresh_token')

    const fetchUser = async () => {
      try {
        const result = await get('/api/v1/sys/auth/session')
        if (response.ok) {
          const data = result?.data ?? {}
          dispatch(
            userActions.setUserDetail({
              ...data,
              token: accessToken
            })
          )
        }
      } catch (error) {
        console.info(error)
      }
    }

    if (accessToken && refreshToken) fetchUser()
  }, [isLogin])

  return {
    formatMessage,
    waterContent
  }
}
