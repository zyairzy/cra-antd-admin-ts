import { Card, Form, Input, Button } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';

const AccountResetPsw = () => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const confirmPswNotMatchText = intl.formatMessage({ id: 'page.account.createmodal.passwordconfirm.notmatch' });
  return (
    <div>
      <Card bordered={false}>
        <Form
          form={form}
          name="resetPassword"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          scrollToFirstError
          style={{ maxWidth: '600px' }}
        >
          <Form.Item
            name="password"
            label={<FormattedMessage id="page.account.createmodal.password" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="page.account.createmodal.password.required" />,
                whitespace: true,
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password-confirm"
            label={<FormattedMessage id="page.account.createmodal.passwordconfirm" />}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="page.account.createmodal.passwordconfirm.required" />,
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(confirmPswNotMatchText));
                },
              }),
            ]}
            validateTrigger="onBlur"
          >
            <Input.Password />
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

export default AccountResetPsw;
