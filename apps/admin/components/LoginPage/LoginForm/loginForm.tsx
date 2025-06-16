import { Link } from 'react-router-dom'
import { Button, Form, Input, Spin } from 'antd'
import { FormattedMessage } from 'react-intl'

import { useLoginPage } from '@/hooks/LoginPage'

const LoginForm = () => {
  const { loading, formatMessage, validateEmail, validatePassword, handleFormSubmit } =
    useLoginPage()

  return (
    <Spin spinning={loading}>
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="email"
          label={formatMessage({ id: 'global.email' })}
          rules={[{ validator: validateEmail }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label={formatMessage({ id: 'global.password' })}
          rules={[{ validator: validatePassword }]}>
          <Input.Password />
        </Form.Item>
        <div className="flex justify-between items-center">
          <Link className="link" to="/forgot-password">
            <FormattedMessage id="global.forgotPassword" />
          </Link>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="global.login" />
          </Button>
        </div>
      </Form>
    </Spin>
  )
}

export default LoginForm
