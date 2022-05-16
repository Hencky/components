import React, { useState } from 'react';
import { Form, FormItem, Select } from '@pms/ui';
import { Card, Row } from 'antd';

const layout = { labelCol: { style: { width: 140 } }, span: 12 };

const source = [
  { value: 'zhejiang', label: '浙江', children: [{ label: '杭州', value: 'hangzhou' }] },
  { value: 'beijing', label: '北京', children: [{ label: '三里屯', value: 'sanlitun' }] },
  { value: 'shanghai', label: '上海', children: [{ label: '上海', value: 'shanghai' }] },
];

const Demo = () => {
  const [form] = Form.useForm();
  const [citySource, setCitySource] = useState<{ label: string; value: string }[]>([]);
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
                return Promise.resolve(source);
              },
              children: (
                <Select
                  placeholder="请选择省份"
                  onChange={(val) => {
                    const targetSource = source.find((item) => item.value === val);
                    setCitySource(targetSource?.children || []);
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
              name: 'city',
              label: '市',
              ...layout,
              dataSource: citySource,
              children: <Select placeholder="请选择地图" />,
            }}
          />
        </Row>
      </Form>
    </Card>
  );
};

export default Demo;
