import { MenuList } from 'interface/layout/menu.interface';
import { mock, intercepter } from './config';

const mockMenuList: MenuList = [
  {
    name: 'account',
    label: {
      zh: '账号管理1',
      en: 'Account',
    },
    icon: 'UserOutlined',
    key: '0',
    path: '/account',
  },
  {
    name: 'edit',
    label: {
      zh: '账号详情',
      en: 'Account Details',
    },
    key: '1-0',
    path: '/account/edit',
    hidden: true,
  },
  {
    name: 'application',
    label: {
      zh: '应用管理2',
      en: 'Application',
    },
    icon: 'AppstoreOutlined',
    key: '1',
    path: '/application',
    children: [
      {
        name: 'application1',
        label: {
          zh: '应用1',
          en: 'APP1',
        },
        key: '1-0',
        path: '/application/app1',
      },
      {
        name: 'application2',
        label: {
          zh: '应用2',
          en: 'APP2',
        },
        key: '1-1',
        path: '/application/app2',
      },
    ],
  },
  {
    name: 'log',
    label: {
      zh: '日志管理',
      en: 'Log',
    },
    icon: 'TableOutlined',
    key: '2',
    path: '/log',
  },
];

mock.mock('/api/v1/user/menu', 'get', intercepter(mockMenuList));
