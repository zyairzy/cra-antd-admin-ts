import { Card, Form, Input, DatePicker, Switch, Button } from 'antd';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AccountInfoProps } from './accountInfo';
import { getUserById, getUserUnlockStatus, unlockUser } from '@/apis/user';
import { User, UserUnlockStatus } from '@/interface/user';
import { parseTime } from '@/utils/commonUtils';
import moment from 'moment';

const AccountBasicInfo = (props: AccountInfoProps) => {
  const { userId } = props;
  const [user, setUser] = useState<User>({} as User);
  const [unlockStatus, setUnlockStatus] = useState<UserUnlockStatus>({ unlockStatus: false });
  const [form] = Form.useForm();
  const DatePickerIns: any = DatePicker;

  const unlockUserHandler = async () => {
    await unlockUser(userId);
  };

  const saveHandler = async values => {
    console.log('save account: ', values);
  };

  useEffect(() => {
    (async function loadUser() {
      const resp = await getUserById(userId);
      setUser(resp);
      resp.createdTimestamp = parseTime(resp.createdTimestamp) as any;
      resp.updatedTimestamp = parseTime(resp.updatedTimestamp) as any;
      if (typeof resp.validTo === 'number' && new Date(resp.validTo).toString() !== new Date(1).toString()) {
        resp.validTo = moment(resp.validTo) as any;
      }
      form.setFieldsValue(resp);
    })();
  }, [userId]);

  useEffect(() => {
    (async function loadUserUnlockStatus() {
      const resp = await getUserUnlockStatus(userId);
      setUnlockStatus(resp);
    })();
  }, [userId]);

  return (
    <div>
      <Card bordered={false}>
        <Form
          form={form}
          name="accountBasicInfo"
          onFinish={saveHandler}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          scrollToFirstError
          style={{ maxWidth: '600px' }}
        >
          <Form.Item name="id" label={<FormattedMessage id="page.account.detail.id" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="username" label={<FormattedMessage id="page.account.username" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="firstName" label={<FormattedMessage id="page.account.detail.firstname" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="lastName" label={<FormattedMessage id="page.account.detail.lastname" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="mobileNumber" label={<FormattedMessage id="page.account.mobileNumber" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label={<FormattedMessage id="page.account.email" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="createdTimestamp" label={<FormattedMessage id="page.account.createdTimestamp" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="updatedTimestamp" label={<FormattedMessage id="page.account.detail.updatedTimestamp" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="requiredAction" label={<FormattedMessage id="page.account.detail.requiredAction" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="validTo" label={<FormattedMessage id="page.account.detail.validto" />}>
            <DatePickerIns showTime />
          </Form.Item>
          <Form.Item
            name="enabled"
            label={<FormattedMessage id="page.account.detail.enabled" />}
            valuePropName="checked"
          >
            <Switch
              checkedChildren={<FormattedMessage id="page.account.detail.lock.on" />}
              unCheckedChildren={<FormattedMessage id="page.account.detail.lock.off" />}
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            name="tempLock"
            label={<FormattedMessage id="page.account.detail.templock" />}
            valuePropName="checked"
          >
            <Switch
              disabled
              checkedChildren={<FormattedMessage id="page.account.detail.lock.on" />}
              unCheckedChildren={<FormattedMessage id="page.account.detail.lock.off" />}
              checked={unlockStatus.unlockStatus}
            />
            {unlockStatus.unlockStatus && (
              <Button style={{ marginLeft: '10px' }} onClick={unlockUserHandler}>
                {<FormattedMessage id="page.account.detail.templock.unlock" />}
              </Button>
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {<FormattedMessage id="page.account.detail.save" />}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AccountBasicInfo;
