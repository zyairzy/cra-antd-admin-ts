import { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { MenuList } from '@/interface/layout/menu.interface';
import { useNavigate, useLocation } from 'react-router-dom';
// import { CustomIcon } from './customIcon';

const { SubMenu, Item } = Menu;

interface MenuProps {
  menuList: MenuList;
}

const MenuComponent = ({ menuList }: MenuProps) => {
  const [openKeys, setOpenkeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { collapsed, device, locale } = { collapsed: false, device: 'DESKTOP', locale: 'zh_CN' };

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const getTitie = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {/* <CustomIcon type={menu.icon!} /> */}
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
      {menuList?.map(menu =>
        menu.children ? (
          <SubMenu key={menu.path} title={getTitie(menu)}>
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
          <Item key={menu.path} onClick={() => onMenuClick(menu)}>
            {getTitie(menu)}
          </Item>
        ) : null
      )}
    </Menu>
  );
};

export default MenuComponent;
