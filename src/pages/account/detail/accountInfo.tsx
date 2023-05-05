import { Collapse } from 'antd';
import { FormattedMessage } from 'react-intl';
import AccountBasicInfo from './accountBasicInfo';
import AccountMgtPermission from './accountMgtPermission';
import AccountResetPsw from './accountResetPsw';
import './index.less';

const { Panel } = Collapse;

export interface AccountInfoProps {
  userId: string;
}

const AccountInfo = (props: AccountInfoProps) => {
  return (
    <>
      <Collapse defaultActiveKey={['1']} bordered={false} accordion className="account-info">
        <Panel
          header={
            <h3>
              <FormattedMessage id="page.account.detail.basicinfo.title" />
            </h3>
          }
          key="1"
        >
          <AccountBasicInfo {...props} />
        </Panel>
        <Panel
          header={
            <h3>
              <FormattedMessage id="page.account.detail.mgtPermission.title" />
            </h3>
          }
          key="2"
        >
          <AccountMgtPermission />
        </Panel>
        <Panel
          header={
            <h3>
              <FormattedMessage id="page.account.detail.resetPsw.title" />
            </h3>
          }
          key="3"
        >
          <AccountResetPsw {...props} />
        </Panel>
      </Collapse>
    </>
  );
};

export default AccountInfo;
