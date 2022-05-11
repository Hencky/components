import React from 'react';
import { QueryForm } from '@pms/ui';
import { Input } from 'antd';

const Demo = () => {
  return (
    <QueryForm
      showDivider={false}
      onSubmit={(values) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('values', values);
            resolve(values);
          }, 1000);
        });
      }}
      onReset={() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('reset');
            resolve('');
          }, 1000);
        });
      }}
      fields={[
        {
          name: 'name',
          label: '名称',
          children: <Input allowClear placeholder="请输入" />,
        },
        {
          name: 'age',
          label: '年龄',
          children: <Input allowClear placeholder="请输入" />,
        },
        // {
        //   name: 'height',
        //   label: '高度',
        //   children: <Input allowClear placeholder="请输入" />,
        // },
      ]}
    />
  );
};

export default Demo;
