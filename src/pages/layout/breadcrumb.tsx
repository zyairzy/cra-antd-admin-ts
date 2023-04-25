import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { MenuList } from '@/interface/layout/menu.interface';

interface MenuProps {
  menuList: MenuList;
}

const breadcrumbNameMap = {};
const setBreadcrumbNameMap = menus => {
  menus.forEach(item => {
    if (item.children) {
      breadcrumbNameMap[item.path] = item.label.zh_CN;
      setBreadcrumbNameMap(item.children);
    } else {
      breadcrumbNameMap[item.path] = item.label.zh_CN;
    }
  });
};

const BreadcrumbComponent = ({ menuList }: MenuProps) => {
  setBreadcrumbNameMap(menuList);
  console.log('breadcrumbNameMap---', breadcrumbNameMap);

  const location = useLocation();

  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = extraBreadcrumbItems;

  return <Breadcrumb style={{ padding: '16px 16px' }}>{breadcrumbItems}</Breadcrumb>;
};

export default BreadcrumbComponent;
