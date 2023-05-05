import { Card, Form, Select, Button } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const AccountMgtPermission = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Card bordered={false}>
        <Form
          form={form}
          name="mgtPermission"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          scrollToFirstError
          style={{ maxWidth: '600px' }}
        >
          <Form.Item name="role" label={<FormattedMessage id="page.account.detail.mgt.role" />}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="请选择"
              defaultValue={['a10', 'c12']}
              onChange={handleChange}
              options={options}
            />
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

export default AccountMgtPermission;
