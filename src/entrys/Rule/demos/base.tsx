import React from 'react';
import { Rule, ButtonAction } from 'lucky-bird-ui';
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
          def: [
            {
              type: 'and',
              children: [
                {
                  b: '=',
                  a: 'a',
                  c: 'a',
                },
                {
                  type: 'or',
                  children: [
                    {
                      b: '=',
                      a: 'a',
                      c: 'a',
                    },
                  ],
                },
              ],
            },
          ],
        }}
      >
        <Rule name={'abc'} condition={<Condition />} lineAction={<LineAction />} groupAction={<GroupAction />} />
        <Rule
          name={'def'}
          disabled
          condition={<Condition />}
          lineAction={<LineAction />}
          groupAction={<GroupAction />}
        />
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
