import React, { useRef } from 'react';
import { Input, InputNumber } from 'antd';

import { EditableTable, type EditableTableInstance } from 'lucky-bird-ui';

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'name',
    renderEditNode: () => <Input size="small" />,
    editFormItemProps: {
      rules: [{ required: true, message: '请输入name' }],
    },
  },
  {
    dataIndex: 'age',
    key: 'age',
    title: 'age',
    renderEditNode: () => <InputNumber size="small" />,
  },
];

const Demo = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  const ref = useRef<EditableTableInstance>();

  return (
    <div>
      <EditableTable
        onChange={onChange}
        columns={columns}
        ref={ref}
        onSave={async (value) => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        }}
        onDelete={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
        }}
      />
    </div>
  );
};

export default Demo;
