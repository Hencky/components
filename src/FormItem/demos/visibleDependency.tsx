import React from 'react';
import { Form, FormItem } from 'lucky-bird-ui';
import { Card, Row, Select } from 'antd';

const layout = { labelCol: { style: { width: 140 } }, span: 12 };

const options = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
];

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Card>
      <Form form={form}>
        <Row gutter={24}>
          <FormItem
            {...{
              name: 'first',
              label: '第一层',
              ...layout,
              children: (
                <Select
                  options={options}
                  allowClear
                  onChange={() => {
                    form.setFieldsValue({
                      second: undefined,
                    });
                  }}
                />
              ),
            }}
          />
          <FormItem
            {...{
              name: 'second',
              label: '第二层',
              ...layout,
              dependency: {
                deps: ['first'],
                visible: {
                  condition: [['1']],
                },
              },
              children: (
                <Select
                  options={options}
                  allowClear
                  onChange={() => {
                    form.setFieldsValue({
                      third: undefined,
                    });
                  }}
                />
              ),
            }}
          />
          <FormItem
            {...{
              name: 'third',
              label: '第三层',
              ...layout,
              dependency: {
                deps: ['second'],
                visible: {
                  condition: [['1']],
                },
              },
              children: (
                <Select
                  options={options}
                  allowClear
                  onChange={() => {
                    form.setFieldsValue({
                      fourth: undefined,
                    });
                  }}
                />
              ),
            }}
          />
          <FormItem
            {...{
              name: 'fourth',
              label: '第四层',
              ...layout,
              dependency: {
                deps: ['third', 'first', 'second'],
                visible: {
                  condition: [
                    ['1', '1', '1'],
                    ['2', '1', '1'],
                  ],
                },
                options: {
                  condition: [['1']],
                  result: [{ label: '3', value: '3' }],
                },
              },
              children: <Select options={options} />,
            }}
          />
        </Row>
      </Form>
    </Card>
  );
};

export default Demo;
