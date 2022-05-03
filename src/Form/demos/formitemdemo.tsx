import React from 'react';
import { Form, FormItem } from '@pms/ui';
import { Input, Card, Row } from 'antd';

const Demo = () => {
  return (
    <Card>
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
      >
        <Row gutter={24}>
          <FormItem
            {...{
              name: 'x1',
              label: 'x1',
              children: <Input placeholder="请输入" />,
            }}
          />
          <FormItem
            {...{
              name: 'x2',
              label: 'x2',
              children: <Input placeholder="请输入" />,
            }}
          />
          <FormItem
            {...{
              name: 'x3',
              label: 'x3',
              span: 12,
              children: <Input placeholder="请输入" />,
            }}
          />
          <FormItem
            {...{
              name: 'x4',
              label: 'x4',
              span: 12,
              children: <Input placeholder="请输入" />,
            }}
          />
        </Row>
      </Form>
    </Card>
  );
};

export default Demo;
