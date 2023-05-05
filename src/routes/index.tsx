import { lazy } from 'react';
import AccountPage from '@/pages/account';
import AccountDetailPage from '@/pages/account/detail';
import ApplicationPage1 from '@/pages/application/App1';
import ApplicationPage2 from '@/pages/application/App2';
import LayoutPage from 'pages/layout';
import { RouteObject } from 'react-router';
import WrapperRouteComponent from './config';
import { useRoutes, Navigate } from 'react-router-dom';

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ 'pages/404'));

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: 'account',
        element: <WrapperRouteComponent element={<AccountPage />} titleId="account" />,
      },
      {
        path: 'account/edit',
        element: <WrapperRouteComponent element={<AccountDetailPage />} titleId="accountDetail" />,
      },
      {
        path: 'application',
        children: [
          { path: '', element: <Navigate to="/application/app1" /> }, // Redirect
          {
            path: 'app1',
            element: <WrapperRouteComponent element={<ApplicationPage1 />} titleId="app1" />,
          },
          {
            path: 'app2',
            element: <WrapperRouteComponent element={<ApplicationPage2 />} titleId="app2" />,
          },
        ],
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId="notFount" />,
      },
    ],
  },
];

const RenderRouter = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
