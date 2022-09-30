import React from 'react';
import { Form, FormGroup, Select, ButtonAction } from '@lucky-bird/ui';
import { Input, Card, Space } from 'antd';

const layout = { labelCol: { style: { width: 120 } } };

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
      <Form form={form}>
        <Space direction="vertical" size={24}>
          <Card title="基础信息">
            <FormGroup
              labelCol={{ span: 4 }}
              fields={[
                {
                  name: 'username',
                  label: '用户名',
                  ...layout,
                  rules: [{ required: true, message: '请输入' }],
                  children: <Input placeholder="请输入" allowClear />,
                },
                {
                  name: 'password',
                  label: '密码',
                  ...layout,
                  rules: [{ required: true, message: '请输入' }],
                  children: <Input placeholder="请输入" allowClear />,
                },
                {
                  name: 'sex',
                  label: '性别',
                  dataSource: [
                    { label: '男', value: 'male' },
                    { label: '女', value: 'female' },
                    { label: '保密', value: 'other' },
                  ],
                  ...layout,
                  rules: [{ required: true, message: '请选择' }],
                  children: <Select placeholder="请选择" allowClear />,
                },
              ]}
            />
          </Card>

          <Card title="其他信息">
            <FormGroup
              fields={[
                {
                  name: 'address',
                  label: '地址',
                  ...layout,
                  remoteDataSource: () => {
                    return Promise.resolve([
                      { label: '北京', value: 'beijing' },
                      { label: '浙江', value: 'zhejiang' },
                    ]);
                  },
                  children: <Select placeholder="请选择" allowClear />,
                },
              ]}
            />
          </Card>

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
        </Space>
      </Form>
    </Card>
  );
};

export default Demo;
