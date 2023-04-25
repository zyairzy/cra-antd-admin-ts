import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="not found"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Not Found
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
