import React from 'react';
import { Form } from '@pms/ui';
import { Input, Card } from 'antd';

const Demo = () => {
  return (
    <Card title="嵌套容器">
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        labelCol={{
          span: 4,
        }}
        container={<Card title={'包裹一层容器'} />}
        fields={[
          {
            name: 'x1',
            label: 'x1',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
          {
            name: 'x2',
            label: 'x2',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
          {
            name: 'x3',
            label: 'x3',
            span: 8,
            children: <Input placeholder="请输入" />,
          },
          {
            name: 'x4',
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
