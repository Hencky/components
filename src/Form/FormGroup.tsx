import React from 'react';
import { Row } from 'antd';
import type { RowProps } from 'antd/lib/row';
import { FormItem, type FormItemProps } from './FormItem';
import { type FormItemBaseProps } from './interface';
import { toArray, canRender } from '../_util';

export interface FormGroupProps extends RowProps, FormItemBaseProps {
  fields: FormItemProps[];
  render?: boolean;
}

export const FormGroup: React.FC<FormGroupProps> = (props) => {
  const { render, fields, className, style, colon, labelCol, labelAlign, wrapperCol, hidden, ...rowProps } = props;

  if (!canRender(render, props)) return null;

  const itemProps = {
    colon,
    labelCol,
    labelAlign,
    wrapperCol,
    hidden,
  };

  const renderFields = (fields) => {
    return fields.map((item) => {
      return <FormItem key={toArray(item.name).join('-')} {...itemProps} {...item} />;
    });
  };

  const ele = renderFields(fields);

  return (
    <Row className={className} style={style} {...rowProps}>
      {ele}
    </Row>
  );
};

FormGroup.defaultProps = {};
