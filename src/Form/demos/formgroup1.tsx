import React from 'react';
import { Form } from '@pms/ui';
import { Input, Card } from 'antd';

const Demo = () => {
  return (
    <Card title="fields平铺使用">
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        labelCol={{
          span: 4,
        }}
        fields={[
          {
            name: 'x1',
            // @ts-ignore
            label: 'x1',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
          {
            name: 'x2',
            // @ts-ignore
            label: 'x2',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
          {
            name: 'x3',
            // @ts-ignore
            label: 'x3',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
          {
            name: 'x4',
            // @ts-ignore
            label: 'x4',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
        ]}
      />
    </Card>
  );
};

export default Demo;
