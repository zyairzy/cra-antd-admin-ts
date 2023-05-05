import { Card, Form, Input, DatePicker, Switch, Button } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

const AccountBasicInfo = () => {
  const [form] = Form.useForm();
  const DatePickerIns: any = DatePicker;

  return (
    <div>
      <Card title={<FormattedMessage id="page.account.detail.basicinfo.title" />}>
        <Form
          form={form}
          name="accountBasicInfo"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          scrollToFirstError
          style={{ maxWidth: '600px' }}
        >
          <Form.Item name="id" label={<FormattedMessage id="page.account.detail.id" />}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label={<FormattedMessage id="page.account.username" />}>
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
          <Form.Item name="updatedTimestamp" label={<FormattedMessage id="page.account.createmodal.name" />}>
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
            />
            <Button style={{ marginLeft: '10px' }}>
              {<FormattedMessage id="page.account.detail.templock.unlock" />}
            </Button>
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
