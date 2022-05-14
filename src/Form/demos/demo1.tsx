import React from 'react';
import { Form, FormGroup, Select } from '@pms/ui';
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
              disabled: true,
              children: <Input placeholder="请输入" />,
            },
            {
              name: 'x2',
              label: 'x2',
              remoteDataSource: () => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve([{ labeL: 'x2-1', value: 'x2-1' }]);
                  }, 1000);
                });
              },
              children: <Select placeholder="请输入" allowClear />,
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
