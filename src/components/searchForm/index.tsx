import React, { forwardRef, useImperativeHandle } from 'react';
import { Form, Button } from 'antd';
import { FormattedMessage } from 'react-intl';

interface SearchFormProps {
  searchItem: object[];
  handleSearch: (arg0?: object) => void;
  ref: RefType;
  loading: boolean;
  beforeSearch?: (arg0?: object) => void;
  onFieldsChange?: (arg0?: unknown, arg1?: unknown) => void;
}

const SearchForm = forwardRef((props: SearchFormProps, ref: RefType) => {
  const { searchItem, handleSearch, beforeSearch, onFieldsChange, loading } = props;
  const [form] = Form.useForm();

  const getFields = (): JSX.Element[] => {
    return searchItem.map((item: CommonObjectType) => {
      return (
        <Form.Item key={item.key} name={item.key} rules={item.rules} style={{ marginBottom: '10px', ...item.style }}>
          {item.slot}
        </Form.Item>
      );
    });
  };

  const initialValues = searchItem.reduce(
    (prev: CommonObjectType, curr: CommonObjectType) => ({
      ...prev,
      [curr.key]: curr.initialValue,
    }),
    {}
  );

  const emitSearch = (formVals: CommonObjectType): void => {
    beforeSearch(formVals);
    handleSearch(formVals);
  };

  useImperativeHandle(ref, () => ({
    // 重置搜索
    resetFields(field: string[]) {
      return field ? form.resetFields([...field]) : form.resetFields();
    },
  }));

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFieldsChange={onFieldsChange}
      layout="inline"
      onFinish={emitSearch}
      style={{ marginBottom: 10 }}
    >
      {getFields()}
      <Form.Item>
        <Button htmlType="submit" type="primary" loading={loading}>
          <FormattedMessage id="component.searchform.btn.search" />
        </Button>
      </Form.Item>
    </Form>
  );
});

SearchForm.displayName = 'SearchForm';
SearchForm.defaultProps = {
  loading: false,
};

export default SearchForm;
