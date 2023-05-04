import React, { useRef } from 'react';
import { Button, Card, Input } from 'antd';
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
  const searchItemList = [
    {
      key: 'search',
      slot: <Input placeholder="account/email/mobile" allowClear />,
      rules: [],
      initialValue: 'zzz',
    },
    {
      key: 'bizType',
      slot: <Input placeholder="application" allowClear />,
    },
    {
      key: 'roleNames',
      slot: <Input placeholder="role" allowClear />,
    },
  ];

  const onSearchItemChange = changedField => {
    console.log(changedField);
  };

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
      render: (_, record) => (
        <>
          {
            <Button ghost type="primary" onClick={() => edit(record)}>
              <FormattedMessage id="page.account.edit" />
            </Button>
          }
        </>
      ),
    },
  ];
  return (
    <Card>
      <div style={{ float: 'right' }}>{<AddBtn />}</div>

      <MyTable
        apiFun={getUsers}
        columns={columns}
        ref={tableRef}
        searchItemList={searchItemList}
        extraProps={{ results: 10 }}
        onFieldsChange={onSearchItemChange}
      />
    </Card>
  );
};
export default AccountList;
