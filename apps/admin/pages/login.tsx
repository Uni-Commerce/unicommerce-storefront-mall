import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'

import LoginPage from '@/components/LoginPage'

const Login = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: 'global.platform' })}</title>
      </Helmet>
      <LoginPage />
    </>
  )
}

export default Login
