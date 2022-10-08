import React from 'react';
import { Rule, ButtonAction } from 'lucky-bird-ui';
import { Form } from 'antd';
import { Condition2, LineAction, GroupAction } from '../Bag';

const { useForm } = Form;

type Group<T> =
  | {
      type: 'or' | 'and';
      children: Group<T>[];
    }
  | T;

type Item = { result: boolean };

const parseCondition = (data: Item) => {
  return data.result;
};

const parseGroup = (data: Group<Item>, parse) => {
  const { type, children } = data as { type: 'or' | 'and'; children: Group<Item>[] };

  if (type === 'or') {
    return children.some((item) => parseGroup(item, parse));
  }

  if (type === 'and') {
    return children.every((item) => parseGroup(item, parse));
  }

  return parse(data);
};

const parse = (data) => {
  return parseGroup(data[0], parseCondition);
};

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
                  result: true,
                },
                {
                  type: 'or',
                  children: [
                    {
                      result: true,
                    },
                    {
                      result: false,
                    },
                  ],
                },
              ],
            },
          ],
        }}
      >
        {/* @ts-expect-error */}
        <Rule name={'abc'} condition={<Condition2 />} lineAction={<LineAction />} groupAction={<GroupAction />} />
      </Form>
      <ButtonAction
        style={{ marginTop: 20 }}
        onClick={() => {
          form.validateFields().then((res) => {
            const values = form.getFieldsValue(true);
            const result = parse(values.abc);
            console.log('result', result);
          });
        }}
      >
        提交
      </ButtonAction>
    </div>
  );
};

export default demo;
