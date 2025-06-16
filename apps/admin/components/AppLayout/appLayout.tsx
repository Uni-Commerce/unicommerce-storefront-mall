import { ConfigProvider, App, Watermark } from 'antd'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'
import type { FC, PropsWithChildren } from 'react'

import { antd } from '@/config/antd'
import { namespace } from '@/config/namespace'
import { useAppLayout } from '@/hooks/AppLayout'

dayjs.locale('zh-cn')
dayjs.extend(utc)
dayjs.extend(relativeTime)
dayjs.extend(timezone)

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const { formatMessage, waterContent } = useAppLayout()

  return (
    <ConfigProvider
      prefixCls={namespace}
      locale={locale}
      theme={antd}
      form={{
        validateMessages: {
          required: formatMessage({ id: 'global.required' })
        }
      }}>
      <Helmet>
        <title>{formatMessage({ id: 'global.platform' })}</title>
      </Helmet>
      <Watermark gap={[200, 200]} content={waterContent}>
        <App>{children}</App>
      </Watermark>
    </ConfigProvider>
  )
}

export default AppLayout
