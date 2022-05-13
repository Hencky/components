import React from 'react';
import moment, { type Moment } from 'moment';
import { DatePicker as ADatePicker } from 'antd';
import type { DatePickerProps as ADatePickerProps } from 'antd/lib/date-picker';

export type DatePickerProps = Omit<ADatePickerProps, 'value'> & {
  valueFormat?: 'utc' | boolean;
  value?: number | string | Moment;
  /** 根据showTime区分TimePicker，ADatePickerProps里没有这个类型 */
  showTime?: boolean;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { onChange, value, valueFormat = true, format, ...restProps } = props;

  const onFormatChange = (time, timeString) => {
    let finalTime = time;

    if (valueFormat === 'utc') {
      finalTime = time?.valueOf();
    } else if (valueFormat) {
      finalTime = time?.format(format);
    }

    onChange?.(finalTime, timeString);
  };

  let finalValue = value;
  if (value) {
    finalValue = moment(value, valueFormat === true ? !!format : undefined);
  }

  return <ADatePicker picker="date" {...restProps} onChange={onFormatChange} value={finalValue as Moment} />;
};
