import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { notification } from 'antd'
import 'antd/dist/reset.css'

import { HttpProvider, LocaleProvider, StoreProvider } from '@/prodiver'
import { namespace } from '@/config/namespace'
import AppLayout from '@/components/AppLayout'
import AppRoutes from '@/components/AppRoutes'

const App = () => {
  useEffect(() => {
    notification.config({
      bottom: 50,
      duration: 3,
      prefixCls: `${namespace}-notification`,
      placement: 'bottomRight'
    })
    window.notification = notification
  }, [])

  return (
    <BrowserRouter>
      <HttpProvider>
        <StoreProvider>
          <LocaleProvider>
            <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
              <AppLayout>
                <AppRoutes />
              </AppLayout>
            </StyleProvider>
          </LocaleProvider>
        </StoreProvider>
      </HttpProvider>
    </BrowserRouter>
  )
}

export default App
