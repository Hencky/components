import React from 'react';
import { QueryForm } from '@pms/ui';
import { Input } from 'antd';

const Demo = () => {
  return (
    <QueryForm
      onSubmit={(values) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('values', values);
            resolve(values);
          }, 1000);
        });
      }}
      fields={[
        {
          name: 'name',
          label: '名称',
          children: <Input allowClear placeholder="请输入" />,
        },
      ]}
    />
  );
};

export default Demo;
