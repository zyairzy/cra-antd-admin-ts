import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { RouteProps, useLocation } from 'react-router';

const AuthRoute = (props: RouteProps) => {
  const logged = false; //TODO: get from redux
  const navigate = useNavigate();
  const location = useLocation();

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="unauthorized"
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
          goToLogin
        </Button>
      }
    />
  );
};

export default AuthRoute;
