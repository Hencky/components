import React from 'react';
import { Form, FormItem, Select } from '@pms/ui';
import { Input, Card, Row } from 'antd';

const layout = { labelCol: { style: { width: 140 } } };

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
      <Form
        onValuesChange={(_, values) => {
          console.log('values', values);
        }}
        form={form}
      >
        <Row gutter={24}>
          <FormItem
            {...{
              name: 'x1',
              label: '输入控件',
              ...layout,
              children: <Input placeholder="请输入" />,
            }}
          />
          <FormItem
            {...{
              name: 'x2',
              label: '选择器',
              ...layout,
              dataSource: [
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
              ],
              children: <Select placeholder="请选择" />,
            }}
          />
          <FormItem
            {...{
              name: 'x3',
              label: '选择器远程数据源',
              ...layout,
              remoteDataSource: () => {
                return Promise.resolve([
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                ]);
              },
              span: 12,
              children: (
                <Select
                  placeholder="请选择远程数据源"
                  onChange={() => {
                    form.setFieldsValue({
                      x4: undefined,
                    });
                  }}
                />
              ),
            }}
          />
          <FormItem
            {...{
              dependencies: ['x3'],
              noStyle: true,
              span: null,
              children: (form) => {
                const depValue = form.getFieldValue(['x3']);
                return (
                  <FormItem
                    {...{
                      name: 'x4',
                      label: 'x4',
                      ...layout,
                      span: 12,
                      remoteDataSource: () => {
                        return Promise.resolve([{ value: depValue, label: depValue }]);
                      },
                    }}
                  >
                    <Select placeholder="请输入" />
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
