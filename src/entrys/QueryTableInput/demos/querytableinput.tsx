import React, { useRef } from 'react';
import { Input, InputNumber } from 'antd';
import { QueryTableInput } from 'lucky-bird-ui';

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    title: 'name',
    editNode: <Input size="small" />,
    editFormItemProps: {
      rules: [{ required: true, message: '请输入name' }],
    },
  },
  {
    dataIndex: 'age',
    key: 'age',
    title: 'age',
    editNode: <InputNumber size="small" />,
  },
];

const Demo = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  const ref = useRef();

  return (
    <div>
      <QueryTableInput
        onChange={onChange}
        columns={columns}
        fields={[{ name: 'a', label: 'name', children: <Input /> }]}
        rowKey="id"
        rowSelectionType="radio"
        remoteDataSource={async () => {
          return {
            total: 100,
            current: 1,
            records: [
              { name: 'a1', id: 1 },
              { name: 'a2', id: 2 },
              { name: 'a3', id: 3 },
              { name: 'a4', id: 4 },
              { name: 'a5', id: 5 },
              { name: 'a6', id: 6 },
            ],
          };
        }}
      />
    </div>
  );
};

export default Demo;
