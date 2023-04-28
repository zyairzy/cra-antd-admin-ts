import React, { useRef } from 'react';
import { Button, Card } from 'antd';
import MyTable from '@/components/table';
import { getUsers } from '@/apis/user';
import { parseTime } from '@/utils/commonUtils';
import { FormattedMessage } from 'react-intl';

export const userStatusShow = (userStatus: boolean) => {
  if (userStatus) {
    return <FormattedMessage id="page.account.enabled.true" />;
  } else {
    return <FormattedMessage id="page.account.enabled.false" />;
  }
};

const AccountList = () => {
  const tableRef: RefType = useRef();

  // 添加
  const add = () => {};
  // 编辑
  const edit = row => {
    console.log(row);
  };

  // 新增按钮
  const AddBtn = () => (
    <Button onClick={add} type="primary">
      <FormattedMessage id="page.account.add" />
    </Button>
  );

  // 搜索栏配置项
  const searchConfigList = [];

  const columns = [
    {
      title: <FormattedMessage id="page.account.username" />,
      dataIndex: 'username',
    },
    {
      title: <FormattedMessage id="page.account.enabled" />,
      dataIndex: 'enabled',
      render: (text: boolean) => userStatusShow(text),
    },
    {
      title: <FormattedMessage id="page.account.email" />,
      dataIndex: 'email',
    },
    {
      title: <FormattedMessage id="page.account.mobileNumber" />,
      dataIndex: 'mobileNumber',
    },
    {
      title: <FormattedMessage id="page.account.createdTimestamp" />,
      dataIndex: 'createdTimestamp',
      sorter: true,
      render: text => parseTime(text),
    },
    {
      title: <FormattedMessage id="page.account.operations" />,
      dataIndex: 'operations',
      align: 'center',
      render: () => (
        <>
          {
            <Button ghost type="primary" onClick={edit}>
              <FormattedMessage id="page.account.edit" />
            </Button>
          }
        </>
      ),
    },
  ];
  return (
    <Card>
      <div>{<AddBtn />}</div>

      <MyTable
        apiFun={getUsers}
        columns={columns}
        ref={tableRef}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
    </Card>
  );
};
export default AccountList;
