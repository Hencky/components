import React from 'react';
import { Form, Col } from 'antd';
import { ColProps } from 'antd/lib/col';
import { FormItemProps as AFormItemProps } from 'antd/lib/form';

export interface FormItemProps extends AFormItemProps, Pick<ColProps, 'span' | 'offset' | 'push' | 'pull'> {
  render?: ((props: FormItemProps) => boolean) | boolean;
  container?: any;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { span, offset, push, pull, style, render, container: Com, ...formItemProps } = props;
  if (!render) return null;
  if (typeof render === 'function' && !render(props)) return null;

  return (
    <Com span={span} offset={offset} pull={pull} push={push}>
      <Form.Item {...formItemProps} style={{ marginBottom: 8, ...style }} />
    </Com>
  );
};

FormItem.defaultProps = {
  span: 24,
  render: true,
  style: {},
  container: Col,
};
