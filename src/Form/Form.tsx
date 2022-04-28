import React from 'react';
import { Form as AForm } from 'antd';
import { FormGroup } from './FormGroup';
import { FormContext } from './context';
import type { FormProps as AFormProps } from 'antd/lib/form';
import type { FormGroupProps } from './FormGroup';

export interface FormProps extends Omit<AFormProps, 'fields'> {
  container?: React.ReactElement;
  fields?: FormGroupProps[];
}

export const Form: React.FC<FormProps> = (props) => {
  const { fields, children, container, ...rest } = props;

  if (children) {
    return <AForm {...rest}>{children}</AForm>;
  }

  return (
    <FormContext.Provider value={{}}>
      <AForm {...rest}>{<FormGroup fields={fields as any} container={container} />}</AForm>
    </FormContext.Provider>
  );
};
