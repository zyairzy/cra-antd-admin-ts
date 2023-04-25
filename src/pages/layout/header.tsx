import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import ReactSvg from 'assets/logo/react.svg';
import AntdSvg from 'assets/logo/antd.svg';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent = ({ collapsed, toggle }: HeaderProps) => {
  const { logged, locale, device } = { logged: true, locale: 'zh_CN', device: 'DESKTOP' }; //TODO: get from redux
  const navigate = useNavigate();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout': {
        const res = true;
        res && navigate('/login');
        return;
      }
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    localStorage.setItem('locale', key);
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <UserOutlined />
          <span onClick={() => navigate('/account')}>account</span>
        </span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <span>
          <LogoutOutlined />
          <span onClick={() => onActionClick('logout')}>logout</span>
        </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="layout-page-header">
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu onClick={selectLocale}>
                <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'zh_CN'} key="zh_CN">
                  简体中文
                </Menu.Item>
                <Menu.Item style={{ textAlign: 'left' }} disabled={locale === 'en_US'} key="en_US">
                  English
                </Menu.Item>
              </Menu>
            }
          >
            <span>
              <TranslationOutlined />
            </span>
          </Dropdown>
          {logged ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <span className="user-action">UserName</span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              login
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
