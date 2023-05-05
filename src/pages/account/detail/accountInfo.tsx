import { Card } from 'antd';
import AccountBasicInfo from './accountBasicInfo';
import AccountMgtPermission from './accountMgtPermission';
import AccountResetPsw from './accountResetPsw';
import './index.less';

const AccountInfo = () => {
  return (
    <div className="account-info">
      <AccountBasicInfo />
      <AccountMgtPermission />
      <AccountResetPsw />
    </div>
  );
};

export default AccountInfo;
