import React, { useState } from 'react';
import { Form, FormGroup, Select, ButtonAction } from '@lucky-bird/ui';
import { Input, Card } from 'antd';

const layout = { labelCol: { style: { width: 120 } } };

const Demo = () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  return (
    <Card>
      <ButtonAction onClick={() => setDisabled((d) => !d)}>{disabled ? '启用' : '禁用'}</ButtonAction>
      <Form form={form}>
        <FormGroup
          {...layout}
          disabled={disabled}
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

      <ButtonAction
        type="primary"
        onClick={() => {
          return form.validateFields().then((values) => {
            console.log('values', values);
          });
        }}
      >
        提交
      </ButtonAction>
    </Card>
  );
};

export default Demo;
