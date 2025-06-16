import { Col, Row } from 'antd'
import { FormattedMessage } from 'react-intl'

import LoginForm from './LoginForm'

const LoginPage = () => {
  return (
    <div>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <div>
            <div>
              <h1>
                <FormattedMessage id="global.platform" />
              </h1>
              <LoginForm />
              <p>
                <span>
                  <FormattedMessage id="global.browser" />:
                </span>
                &nbsp;
                <a target="_blank" href="https://www.google.cn/chrome/" rel="noreferrer">
                  Google Chrome
                </a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
