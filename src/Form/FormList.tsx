import React from 'react';
import { Form } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { FormGroup } from './FormGroup';
import { toArray } from '../_util/array';
import type { FormListOperation } from 'antd/lib/form/FormList';
import type { FormInstance } from 'antd/lib/form';
import type { FormItemProps } from './FormItem';

const { List } = Form;

export interface FormListProps {
  fields: FormItemProps[];
  form: FormInstance;
  name: NamePath;
  containerRender?: (
    props: { index: number; form: FormInstance; values: Record<string, any> } & FormListOperation
  ) => React.ReactElement;
}

export const FormList = (props: React.PropsWithChildren<FormListProps>) => {
  const { name, fields, containerRender, form } = props;

  return (
    <List name={name}>
      {(listFields, { add, remove, move }) => {
        return listFields.map((field, index) => {
          const ele = (
            <FormGroup
              key={toArray(field.name).join('-')}
              fields={
                fields.map((f) => ({
                  ...f,
                  ...field,
                  render: (p) => {
                    const values = form.getFieldValue([...toArray(name), index]);
                    return (f.render as (...arg: any[]) => any)?.({ values, name: f.name }) ?? true;
                  },
                  name: [...toArray(field.name), ...toArray(f.name)],
                })) as any
              }
            />
          );

          if (containerRender) {
            const groupValue = form.getFieldValue([...toArray(name), index]);
            const container = containerRender({
              form,
              index,
              add,
              remove,
              move,
              values: groupValue,
            });
            return React.cloneElement(container, { key: toArray(field.name).join('-') }, ele);
          }

          return ele;
        });
      }}
    </List>
  );
};
