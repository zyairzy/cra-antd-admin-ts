import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import AuthRoute from './authRoute';

export type WrapperRouteProps = RouteProps & {
  titleId: string;
  auth?: boolean; //authorization？
};

const WrapperRouteComponent = ({ auth, ...props }: WrapperRouteProps) => {
  return auth ? <AuthRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
