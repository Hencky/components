import React from 'react';
import { QueryForm } from '@lucky-bird/ui';
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
      fields={[
        {
          name: 'name',
          label: '名称',
          children: <Input placeholder="请输入搜索名称" />,
        },
      ]}
    />
  );
};

export default Demo;
