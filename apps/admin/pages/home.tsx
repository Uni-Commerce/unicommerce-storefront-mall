import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'

import HomePage from '@/components/HomePage'

const Home = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Helmet>
        <title>{formatMessage({ id: 'menu.dashboard' })}</title>
      </Helmet>
      <HomePage />
    </>
  )
}

export default Home
