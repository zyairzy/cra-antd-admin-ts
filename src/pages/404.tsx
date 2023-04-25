import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle={<FormattedMessage id="page.404.subtitle" />}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          <FormattedMessage id="page.404.btn" />
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
