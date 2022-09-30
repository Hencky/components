import React from 'react';
import { Form, FormItem, Select } from '@lucky-bird/ui';
import { Input, Card, Row, Button } from 'antd';

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
      <Form form={form}>
        <Row gutter={24}>
          <FormItem
            {...{
              name: 'username',
              label: '用户名',
              labelCol: { style: { width: 80 } },
              rules: [{ required: true, message: '请输入用户名' }],
              children: <Input placeholder="请输入用户名" allowClear />,
            }}
          />
          <FormItem
            {...{
              name: 'sex',
              label: '性别',
              span: 12,
              dataSource: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
                { label: '保密', value: 'other' },
              ],
              labelCol: { style: { width: 80 } },
              rules: [{ required: true, message: '请选择' }],
              children: <Select placeholder="请选择" allowClear />,
            }}
          />
          <FormItem
            {...{
              name: 'address',
              label: '地区',
              span: 12,
              remoteDataSource: () => {
                return Promise.resolve([
                  { label: '北京', value: 'beijing' },
                  { label: '浙江', value: 'zhejiang' },
                ]);
              },
              labelCol: { style: { width: 80 } },
              rules: [{ required: true, message: '请选择' }],
              children: <Select placeholder="请选择" allowClear />,
            }}
          />
          <FormItem offset={2}>
            <Button
              type="primary"
              onClick={() => {
                form.validateFields().then((values) => {
                  console.log('values', values);
                });
              }}
            >
              提交
            </Button>
          </FormItem>
        </Row>
      </Form>
    </Card>
  );
};

export default Demo;
