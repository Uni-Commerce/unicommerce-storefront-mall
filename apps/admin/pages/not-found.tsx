import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'

import NotFound from '@/components/NotFound'

const NoPage = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: 'global.notFound' })}</title>
      </Helmet>
      <NotFound />
    </>
  )
}

export default NoPage
