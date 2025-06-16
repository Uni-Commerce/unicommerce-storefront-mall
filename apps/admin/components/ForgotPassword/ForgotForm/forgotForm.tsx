import { Link } from 'react-router-dom'
import { Button, Form, Input, Spin } from 'antd'
import { FormattedMessage } from 'react-intl'

import { useForgotPassword } from '@/hooks/ForgotPassword'

const ForgotForm = () => {
  const { loading, formatMessage, validateEmail, handleFormSubmit } = useForgotPassword()

  return (
    <Spin spinning={loading}>
      <Form layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="email"
          label={formatMessage({ id: 'global.email' })}
          rules={[{ validator: validateEmail }]}>
          <Input type="emial" />
        </Form.Item>
        <div>
          <Link className="link" to="/login">
            <FormattedMessage id="global.backLogin" />
          </Link>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="global.submit" />
          </Button>
        </div>
      </Form>
    </Spin>
  )
}

export default ForgotForm
