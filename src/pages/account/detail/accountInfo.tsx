import { Card } from 'antd';
import AccountBasicInfo from './accountBasicInfo';
import './index.less';

const AccountInfo = () => {
  return (
    <div className="account-info">
      <AccountBasicInfo />
      <Card title="bbb"></Card>
      <Card title="ccc"></Card>
    </div>
  );
};

export default AccountInfo;
