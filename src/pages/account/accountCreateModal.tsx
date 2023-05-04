import { Form, notification, Modal, Input } from 'antd';
import { useState, useImperativeHandle, forwardRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface CreateModalProps {
  onCreate?: (arg0?: object) => void;
}

const AccountCreateModal = forwardRef((props: CreateModalProps, pRef: RefType) => {
  const { onCreate } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useImperativeHandle(pRef, () => ({
    // 暴露给父组件的方法
    showModalRef: () => {
      setVisible(true);
    },
    hideModalRef: () => {
      setVisible(false);
    },
  }));

  const [form] = Form.useForm();

  const intl = useIntl();

  const createAccountHandler = async values => {
    console.log('create account: ', values);
    setConfirmLoading(true);

    try {
      // TODO:
      notification.success({
        message: intl.formatMessage({ id: 'page.account.createmodal.success' }),
      });

      onCreate(values);
    } catch (error) {
      console.error('SetAssetMeta', error);
      notification.error({
        message: error,
      });

      onCreate({});
    } finally {
      setConfirmLoading(false);
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async values => {
        await createAccountHandler(values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const btnOkText = intl.formatMessage({ id: 'page.account.createmodal.btn.ok' });
  const confirmPswNotMatchText = intl.formatMessage({ id: 'page.account.createmodal.passwordconfirm.notmatch' });
  return (
    <>
      <Modal
        title={<FormattedMessage id="page.account.createmodal.title" />}
        visible={visible}
        destroyOnClose={true}
        okText={btnOkText}
        cancelText={<FormattedMessage id="page.account.createmodal.btn.cancel" />}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        onOk={handleOk}
      >
        <Form
          form={form}
          name="createAccount"
          layout="vertical"
          scrollToFirstError
          style={{ margin: '8px auto auto', maxWidth: '600px' }}
        >
          <Form.Item
            name="name"
            label={<FormattedMessage id="page.account.createmodal.name" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="page.account.createmodal.name.required" />,
                whitespace: true,
              },
            ]}
            validateTrigger="onBlur"
          >
            <Input />
          </Form.Item>
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
        </Form>
      </Modal>
    </>
  );
});

AccountCreateModal.displayName = 'AccountCreateModal';

export default AccountCreateModal;
