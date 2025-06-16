import { Button, Dropdown, Space } from 'antd'
import { VscAccount } from 'react-icons/vsc'
import type { MenuProps } from 'antd'

import { useAppLogout } from '@/hooks/AppLogout'
import TimeComponent from '@/components/TimeComponent'

const AppLogout = () => {
  const { userName, handleLogout, handleToPassword } = useAppLogout()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '修改密码',
      onClick: handleToPassword
    },
    {
      key: '2',
      label: '退出',
      onClick: handleLogout
    }
  ]

  return (
    <div>
      <div>
        <span className="time">系统时间:</span>
        <TimeComponent />
      </div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Space>
          <Button type="text">
            <VscAccount size={20} />
            <span className="name" dangerouslySetInnerHTML={{ __html: userName }} />
          </Button>
        </Space>
      </Dropdown>
    </div>
  )
}

export default AppLogout
