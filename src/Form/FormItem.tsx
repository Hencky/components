import React from 'react';
import { Form, Col } from 'antd';
import { ColProps } from 'antd/lib/col';
import { FormItemProps as AFormItemProps } from 'antd/lib/form';
import { canRender } from '../_util';

export interface FormItemProps
  extends AFormItemProps,
    Pick<ColProps, 'span' | 'offset' | 'push' | 'pull' | 'order' | 'flex'> {
  render?: ((props: FormItemProps) => boolean) | boolean;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const { span, offset, push, pull, order, flex, style, render, ...formItemProps } = props;
  const colProps = { span, offset, push, pull, order, flex };

  if (!canRender(render, props)) return null;

  const ele = <Form.Item {...formItemProps} style={{ marginBottom: 16, ...style }} />;

  if (span) {
    return <Col {...colProps}>{ele}</Col>;
  }

  return ele;
};

FormItem.defaultProps = {
  span: 24,
  render: true,
  style: {},
};
