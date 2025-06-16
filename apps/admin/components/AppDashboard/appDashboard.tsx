import { Outlet } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Button, Layout } from 'antd'
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { RiCoupon3Line } from 'react-icons/ri'
import { useAppDashboard } from '@/hooks/AppDashboard'

import ErrorBoundary from '@/ui/ErrorBoundary'
import AppMenu from '@/components/AppMenu'
import AppLogout from '@/components/AppLogout'

const { Header, Sider, Content } = Layout

const AppDashboard = () => {
  const { collapsed, colorBgContainer, borderRadiusLG, isMobile, handleOnToggle } =
    useAppDashboard()
  const sliderProps = isMobile
    ? { collapsed, onCollapse: handleOnToggle }
    : { trigger: null, collapsed }

  return (
    <Layout>
      <Sider breakpoint="md" collapsedWidth="0" collapsible width={245} {...sliderProps}>
        <div>
          <RiCoupon3Line size={30} color="#fff" />
          {!collapsed && (
            <span>
              <FormattedMessage id="global.platform" />
            </span>
          )}
        </div>
        <AppMenu />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div>
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
                onClick={handleOnToggle}
              />
            )}
            <AppLogout />
          </div>
        </Header>
        <Content
          style={{
            margin: isMobile ? 15 : 16,
            padding: isMobile ? 15 : 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto'
          }}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppDashboard
