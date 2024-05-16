import React, { useRef } from 'react';
import { Button, Input, InputNumber, message } from 'antd';
import { remoteDataSource } from '../../../Table/demos/config';
import { EditableQueryTable, type EditableQueryTableInstance } from 'lucky-bird-ui';

import 'antd/lib/input-number/style/index.less';

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

  const ref = useRef<EditableQueryTableInstance>();

  return (
    <div>
      <Button
        onClick={() => {
          ref.current?.add({ name: 'abc', age: 123 });
        }}
      >
        外部添加
      </Button>
      <EditableQueryTable
        fields={[
          {
            name: 'a',
            label: 'a',
            children: <Input />,
          },
        ]}
        onChange={onChange}
        columns={columns}
        ref={ref}
        remoteDataSource={remoteDataSource}
        onDelete={async (id) => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          message.success(`删除${id}`);
        }}
        onSave={async (data) => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          console.log('save', data);
          message.success(`保存${data.id}`);
        }}
      />
    </div>
  );
};

export default Demo;
