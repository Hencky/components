import React from 'react';
import { Switch, Form, Space } from 'antd';
import type { FormListFieldData } from 'antd/lib/form/FormList';

const { Item } = Form;

export interface Condition2Props {
  field: FormListFieldData;
}

export const Condition2: React.FC<Condition2Props> = (props) => {
  const { field } = props;
  const { key, ...restField } = field;

  return (
    <Space size={0}>
      <Item
        {...restField}
        valuePropName="checked"
        name={[restField.name, 'result']}
        rules={[{ required: false }]}
        style={{ marginBottom: 0 }}
      >
        <Switch />
      </Item>
    </Space>
  );
};
