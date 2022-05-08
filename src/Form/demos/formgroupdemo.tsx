import React from 'react';
import { Form, FormGroup } from '@pms/ui';
import { Input, Card } from 'antd';

const Demo = () => {
  return (
    <Card>
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <FormGroup
          labelCol={{ span: 4 }}
          fields={[
            {
              name: 'x1',
              label: 'x1',
              children: <Input placeholder="请输入" />,
            },
            {
              name: 'x2',
              label: 'x2',
              children: <Input placeholder="请输入" />,
            },
            {
              name: 'x3',
              label: 'x3',
              children: <Input placeholder="请输入" />,
            },
            {
              name: 'x4',
              label: 'x4',
              children: <Input placeholder="请输入" />,
            },
          ]}
        />
      </Form>
    </Card>
  );
};

export default Demo;