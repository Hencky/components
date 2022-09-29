import React from 'react';
import { Rule, ButtonAction } from '@pms/ui';
import { Form } from 'antd';
import { Condition, LineAction, GroupAction } from '../Bag';

const { useForm } = Form;

const demo = () => {
  const [form] = useForm();
  return (
    <div>
      <Form
        form={form}
        initialValues={{
          abc: [
            {
              type: 'and',
              children: [
                {
                  operation: '',
                  variable: '',
                  condition: '',
                },
                {
                  type: 'or',
                  children: [
                    {
                      operation: '',
                      variable: '',
                      condition: '',
                    },
                    {
                      operation: '',
                      variable: '',
                      condition: '',
                    },
                  ],
                },
              ],
            },
          ],
        }}
      >
        {/* @ts-expect-error */}
        <Rule name={'abc'} condition={<Condition />} lineAction={<LineAction />} groupAction={<GroupAction />} />
      </Form>
      <ButtonAction
        style={{ marginTop: 20 }}
        onClick={() => {
          form.validateFields().then((res) => {
            const values = form.getFieldsValue(true);
            console.log('values', values);
          });
        }}
      >
        提交
      </ButtonAction>
    </div>
  );
};

export default demo;
