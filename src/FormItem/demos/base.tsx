import React from 'react';
import { Form, FormItem, Select } from 'lucky-bird-ui';
import { Input, Card, Row, Button } from 'antd';

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
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
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        form={form}
      >
        <Row gutter={24}>
          <FormItem
            {...{
              name: 'username',
              label: '用户名',
              labelCol: { span: 4 },
              rules: [{ required: true, message: '请输入用户名' }],
              children: <Input placeholder="请输入用户名" allowClear />,
            }}
          />
          <FormItem
            {...{
              name: 'sex',
              label: '性别',
              dataSource: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
                { label: '保密', value: 'other' },
              ],
              labelCol: { span: 4 },
              rules: [{ required: true, message: '请选择' }],
              children: <Select placeholder="请选择" allowClear />,
            }}
          />
          <FormItem
            {...{
              name: 'address',
              label: '地区',
              remoteDataSource: () => {
                return Promise.resolve([
                  { label: '北京', value: 'beijing' },
                  { label: '浙江', value: 'zhejiang' },
                ]);
              },
              labelCol: { span: 4 },
              rules: [{ required: true, message: '请选择' }],
              children: <Select placeholder="请选择" allowClear />,
            }}
          />
        </Row>
      </Form>
    </Card>
  );
};

export default Demo;
