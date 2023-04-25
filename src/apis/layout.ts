import { MenuList } from '@/interface/layout/menu.interface';

export const getMenuList: MenuList = [
  {
    name: 'account',
    label: {
      zh_CN: '账号管理',
      en_US: 'Account',
    },
    icon: 'account',
    key: '0',
    path: '/account',
  },
  {
    name: 'edit',
    label: {
      zh_CN: '账号详情',
      en_US: 'Account Details',
    },
    key: '1-0',
    path: '/account/edit',
    hidden: true,
  },
  {
    name: 'application',
    label: {
      zh_CN: '应用管理',
      en_US: 'application',
    },
    icon: 'application',
    key: '1',
    path: '/application',
    children: [
      {
        name: 'application1',
        label: {
          zh_CN: '应用1',
          en_US: 'APP1',
        },
        key: '1-0',
        path: '/application/app1',
      },
      {
        name: 'application2',
        label: {
          zh_CN: '应用2',
          en_US: 'APP2',
        },
        key: '1-1',
        path: '/application/app2',
      },
    ],
  },
  {
    name: 'log',
    label: {
      zh_CN: '日志管理',
      en_US: 'Log',
    },
    icon: 'log',
    key: '2',
    path: '/log',
  },
];
