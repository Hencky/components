import React, { useRef } from 'react';
import { Button, Input, InputNumber } from 'antd';

import { EditableTable, type EditableTableInstance } from 'lucky-bird-ui';

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'name',
    editRender: () => {
      return <Input size="small" />;
    },
    editFormItemProps: {
      rules: [{ required: true, message: '请输入name' }],
    },
  },
  {
    dataIndex: 'age',
    key: 'age',
    title: 'age',
    editRender: () => {
      return <InputNumber size="small" />;
    },
  },
];

const Demo = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  const ref = useRef<EditableTableInstance>();

  return (
    <div>
      <Button
        onClick={() => {
          ref.current?.add({ name: 'abc', age: 123 });
        }}
      >
        外部添加
      </Button>
      <EditableTable onChange={onChange} columns={columns} ref={ref} />
    </div>
  );
};

export default Demo;
