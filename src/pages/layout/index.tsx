import { useEffect, Suspense, useCallback, useState } from 'react';
import { Layout, Drawer } from 'antd';
import './index.less';
import HeaderComponent from './header';
import MenuComponent from './menu';
import BreadcrumbComponent from './breadcrumb';

// import { getGlobalState } from 'utils/getGloabal';
import SuspendFallbackLoading from './suspendFallbackLoading';
import { getMenuList } from 'apis/layout';
import { MenuList, MenuChild } from 'interface/layout/menu.interface';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '@/stores/useReduxHook';
import { setCollapsed } from '@/stores/slicers/global';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage = () => {
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, newUser } = { device: 'DESKTOP', newUser: {} }; // get from redux
  const collapsed = useAppSelector(state => state.appGlobal.collapsed);
  const dispatch = useAppDispatch();
  const isMobile = device === 'MOBILE';

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/account');
    }
  }, [navigate, location]);

  const toggle = () => {
    dispatch(setCollapsed(!collapsed));
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];
    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });
    return MenuListAll;
  };

  const fetchMenuList = useCallback(async () => {
    // const { status, result } = await getMenuList();
    const result = getMenuList;
    setMenuList(result);
    if (status) {
      setMenuList(result);
    }
  }, []);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    window.onresize = () => {
      // const { device } = getGlobalState();
      const device = 'DESKTOP';
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;
      dispatch(setCollapsed(needCollapse));
    };
  }, [dispatch]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md"
            style={{ overflowY: 'auto' }}
          >
            <MenuComponent menuList={menuList} />
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            visible={!collapsed}
          >
            <MenuComponent menuList={menuList} />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <BreadcrumbComponent menuList={menuList} />
          <Suspense
            fallback={
              <SuspendFallbackLoading
                message="Alert message title"
                description="Further details about the context of this alert."
              />
            }
          >
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
