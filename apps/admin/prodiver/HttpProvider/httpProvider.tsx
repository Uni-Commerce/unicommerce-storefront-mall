import { useNavigate } from 'react-router-dom'
import { Provider } from '@unicommerce/http'
import { useCookie } from '@unicommerce/hooks'
import { useFetch } from '@unicommerce/http'
import type { FC } from 'react'
import type { FetchProviderProps } from '@unicommerce/http'

const HttpProvider: FC<FetchProviderProps> = ({ children }) => {
  const { cookie } = useCookie()
  const navigate = useNavigate()
  const isDev: boolean = import.meta.env.DEV
  const baseURL: string = isDev ? import.meta.env.REACT_APP_HOST_URL : window.location.origin
  const [request, tokenResponse] = useFetch('/api/v1/sys/auth/refresh', {
    headers: {
      Authorization: `Bearer ${cookie.getItem('refresh_token')}`
    }
  })

  const apiOptions: any = {
    cachePolicy: 'network-only',
    timeout: 60 * 1000,
    responseType: 'json',
    retries: 1,
    interceptors: {
      request: async ({ options }: any) => {
        const locale: string = cookie.getItem('locale_code')
        const token: string = cookie.getItem('access_token')
        const headers: any = {
          Accept: 'application/json',
          'Accept-Language': locale,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Lang': 'zh',
          Authorization: `Bearer ${token}`
        }

        if (options.body instanceof FormData) {
          delete headers['Content-Type']
        }

        return {
          ...options,
          headers: {
            ...headers,
            ...options.headers
          }
        }
      },
      response: async ({ response }: any) => {
        if (!response.ok) {
          if (response.status !== 401) {
            window.notification.info({
              message: response.data.meta.message
            })
          }
        }

        return response
      }
    },
    onError: (error: any) => {
      const Console = console
      Console.log(error)
    },
    retryOn: async ({ response }: any): Promise<any> => {
      if (response.status === 401 && !response.url.includes('/refresh')) {
        const result = await request.post()

        if (tokenResponse.ok) {
          const data = result?.data ?? {}
          cookie.setItem('access_token', data.accessToken)
          cookie.setItem('refresh_token', data.refreshToken, {
            maxAge: 60 * 60 * 24 * 1
          })
          return true
        }

        if (result.status === 400) {
          cookie.removeItem('access_token')
          cookie.removeItem('refresh_token')
          navigate('/login')
        }

        return false
      }
    }
  }

  return (
    <Provider url={baseURL} options={apiOptions}>
      {children}
    </Provider>
  )
}

export default HttpProvider
