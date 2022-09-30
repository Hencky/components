import React from 'react';
import { Form, FormItem, Select } from 'lucky-bird-ui';
import { Card, Row } from 'antd';

const layout = { labelCol: { style: { width: 140 } }, span: 12 };

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
      <Form form={form}>
        <Row gutter={24}>
          <FormItem
            {...{
              name: 'province',
              label: '省',
              ...layout,
              remoteDataSource: () => {
                return Promise.resolve([
                  { value: 'zhejiang', label: '浙江' },
                  { value: 'beijing', label: '北京' },
                  { value: 'shanghai', label: '上海' },
                ]);
              },
              children: (
                <Select
                  placeholder="请选择省份"
                  onChange={() => {
                    form.setFieldsValue({
                      city: undefined,
                    });
                  }}
                />
              ),
            }}
          />
          <FormItem
            {...{
              dependencies: ['province'],
              noStyle: true,
              span: null,
              children: (form) => {
                const depValue = form.getFieldValue(['province']);
                return (
                  <FormItem
                    {...{
                      name: 'city',
                      label: '市',
                      ...layout,
                      remoteDataSource: () => {
                        console.log('发起请求');
                        return Promise.resolve([{ value: depValue, label: `${depValue}下的地区` }]);
                      },
                    }}
                  >
                    <Select placeholder="请输入地区" />
                  </FormItem>
                );
              },
            }}
          />
        </Row>
      </Form>
    </Card>
  );
};

export default Demo;
