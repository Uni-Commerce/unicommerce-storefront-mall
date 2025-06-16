import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Button, Result } from 'antd'

const NotFound = () => {
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/')
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle={<FormattedMessage id="global.sorryMessage" />}
      extra={
        <Button type="primary" onClick={handleRedirect}>
          <FormattedMessage id="global.backHome" />
        </Button>
      }
    />
  )
}

export default NotFound
