import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'

import ForgotPassword from '@/components/ForgotPassword'

const ForgotPage = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: 'global.forgotPassword' })}</title>
      </Helmet>
      <ForgotPassword />
    </>
  )
}

export default ForgotPage
