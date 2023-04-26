import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { MenuList } from '@/interface/layout/menu.interface';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicIcon from './dynamicIcon';
import { useAppSelector } from '@/stores/useReduxHook';

const { SubMenu, Item } = Menu;

interface MenuProps {
  menuList: MenuList;
}

const MenuComponent = ({ menuList }: MenuProps) => {
  const [openKeys, setOpenkeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { collapsed, device } = { collapsed: false, device: 'DESKTOP' };
  const locale = useAppSelector(state => state.appGlobal.locale);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {/* <DynamicIcon type={menu.icon} style={{ fontSize: 16 }} /> */}
        <span>{menu.label[locale]}</span>
      </span>
    );
  };

  const onMenuClick = (menu: MenuList[0]) => {
    if (menu.path === pathname) return;
    const { key, label, path } = menu;
    setSelectedKeys([key]);
    if (device !== 'DESKTOP') {
      // dispatch(setUserItem({ collapsed: true }));
    }
    navigate(path);
  };

  useEffect(() => {
    setSelectedKeys([pathname]);
    setOpenkeys(collapsed ? [] : ['/' + pathname.split('/')[1]]);
  }, [collapsed, pathname]);

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    setOpenkeys(key ? [key] : []);
  };

  return (
    <Menu
      mode="inline"
      theme="light"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange as any}
      className="layout-page-sider-menu"
    >
      {menuList?.map(menu => {
        const menuIcon = menu.icon ? <DynamicIcon type={menu.icon} style={{ fontSize: 16 }} /> : null;

        return menu.children ? (
          <SubMenu key={menu.path} title={getTitie(menu)} icon={menuIcon}>
            {menu.children.map(child => {
              if (!child.hidden) {
                return (
                  <Item key={child.path} onClick={() => onMenuClick(child)}>
                    {child.label[locale]}
                  </Item>
                );
              }
            })}
          </SubMenu>
        ) : !menu.hidden ? (
          <Item key={menu.path} icon={menuIcon} onClick={() => onMenuClick(menu)}>
            {getTitie(menu)}
          </Item>
        ) : null;
      })}
    </Menu>
  );
};

export default MenuComponent;
