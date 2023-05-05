import { Tabs } from 'antd';
import { FormattedMessage } from 'react-intl';
import { getQuery } from '@/utils/commonUtils';
import AccountInfo from './accountInfo';

const onChange = (key: string) => {
  console.log(key);
};

const AccountDetail = () => {
  const query = getQuery();
  const { id, username } = query;

  return (
    <>
      <h3>
        {<FormattedMessage id="page.account.username" />}: {username}
      </h3>
      <Tabs
        onChange={onChange}
        type="card"
        items={[
          {
            label: <FormattedMessage id="page.account.detail.accountInfo" />,
            key: 'accountInfo',
            children: <AccountInfo userId={id} />,
          },
          {
            label: <FormattedMessage id="page.account.detail.appPermission" />,
            key: 'appPermission',
            children: null,
          },
        ]}
      />
    </>
  );
};

export default AccountDetail;
