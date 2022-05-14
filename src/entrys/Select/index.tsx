import React from 'react';
import { Select as ASelect } from 'antd';
import { SelectProps as ASelectProps } from 'antd/lib/select';

export interface SelectProps<T> extends ASelectProps<T> {
  dataSource?: ASelectProps<T>['options'];
}

export const Select: <T>(props: SelectProps<T>) => React.ReactElement = (props) => {
  const { dataSource, options, ...rest } = props;
  return <ASelect {...rest} options={options || dataSource} />;
};
