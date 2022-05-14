import React from 'react';
import { Row } from 'antd';
import type { RowProps } from 'antd/lib/row';
import { FormItem, type FormItemProps } from './FormItem';
import { type FormItemBaseProps } from './interface';
import { isBooleanProp, getFormKey } from '../_util';

export interface FormGroupProps extends RowProps, FormItemBaseProps {
  fields: FormItemProps[];
  render?: (props: FormGroupProps) => boolean | boolean;
}

export const FormGroup: React.FC<FormGroupProps> = (props) => {
  const { render, fields, className, style, colon, labelCol, labelAlign, wrapperCol, hidden, disabled, ...rowProps } =
    props;

  if (!isBooleanProp(render, props)) return null;

  const itemProps = {
    colon,
    labelCol,
    labelAlign,
    wrapperCol,
    hidden,
    disabled,
  };

  const renderFields = (fields) => {
    return fields.map((item) => {
      return <FormItem key={getFormKey(item)} {...itemProps} {...item} />;
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
