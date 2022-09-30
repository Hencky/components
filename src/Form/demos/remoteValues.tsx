import React from 'react';
import { Form, FormGroup, Select } from 'lucky-bird-ui';
import { Input, Card } from 'antd';

const Demo = () => {
  return (
    <Card>
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        remoteValues={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ username: 'Hencky', password: '*****', sex: 'male', address: 'zhejiang' });
            }, 1000);
          });
        }}
      >
        <FormGroup
          labelCol={{ style: { width: 80 } }}
          fields={[
            {
              name: 'username',
              label: '用户名',
              rules: [{ required: true, message: '请输入' }],
              children: <Input placeholder="请输入" />,
            },
            {
              name: 'password',
              label: '密码',
              rules: [{ required: true, message: '请输入' }],
              children: <Input placeholder="请输入" />,
            },
            {
              name: 'sex',
              label: '性别',
              span: 12,
              dataSource: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
                { label: '保密', value: 'other' },
              ],
              rules: [{ required: true, message: '请选择' }],
              children: <Select placeholder="请选择" />,
            },
            {
              name: 'address',
              label: '地址',
              span: 12,
              remoteDataSource: () => {
                return Promise.resolve([
                  { label: '北京', value: 'beijing' },
                  { label: '浙江', value: 'zhejiang' },
                ]);
              },
              children: <Select placeholder="请选择" />,
            },
          ]}
        />
      </Form>
    </Card>
  );
};

export default Demo;
