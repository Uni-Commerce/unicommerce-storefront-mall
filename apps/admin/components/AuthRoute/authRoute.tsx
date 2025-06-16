import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Button, Result } from 'antd'

import { permissions } from '@/config/permisson'
import NotFound from '@/components/NotFound'
import LazyComponent from '@/ui/LazyComponent'

const AuthRoute = ({ route }: any) => {
  const navigate = useNavigate()
  const userRole = useSelector((state: Store) => state.user.userRole)

  const modules: string[] = useMemo(() => {
    const result = permissions.find((item) => item.name === userRole)
    return result?.modules ?? []
  }, [userRole])

  if (route) {
    if (route?.moduleName) {
      if (modules.includes(route.moduleName)) {
        const Component: any = route.component
        return <LazyComponent element={<Component />} />
      }

      return (
        <Result
          status="403"
          title="403"
          subTitle={<FormattedMessage id="global.authorizedMsg" />}
          extra={
            <Button type="primary" onClick={() => navigate('/')}>
              <FormattedMessage id="global.backHome" />
            </Button>
          }
        />
      )
    }

    const Component: any = route.component
    return <LazyComponent element={<Component />} />
  }

  return <NotFound />
}

export default AuthRoute
