import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useFetch } from '@unicommerce/http'
import type { FormProps } from 'antd'

import { useCookie, useValidate } from '@unicommerce/hooks'

type FieldType = {
  email: string
}

export const useForgotPassword = () => {
  const navigate = useNavigate()
  const { post, response } = useFetch()
  const { cookie } = useCookie()
  const { formatMessage } = useIntl()
  const { validateEmail } = useValidate()
  const [loading, setLoading] = useState<boolean>(false)

  const handleFormSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setLoading(true)
      const result = await post('/api/v1/sys/auth/token', {
        email: values.email
      })

      if (response.ok) {
        setLoading(false)
        const data: any = result?.data ?? {}
        cookie.setItem('access_token', data.accessToken)
        cookie.setItem('refresh_token', data.refreshToken, {
          maxAge: 60 * 60 * 24 * 1
        })
        await navigate('/')
      } else {
        setLoading(false)
      }
    } catch (error) {
      console.info(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = cookie.getItem('access_token')

    if (token) navigate('/')
  }, [])

  return {
    loading,
    formatMessage,
    validateEmail,
    handleFormSubmit
  }
}
