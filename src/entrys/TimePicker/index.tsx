import React from 'react';
import moment, { type Moment } from 'moment';
import { TimePicker as ATimePicker } from 'antd';
import type { TimePickerProps as ATimePickerProps } from 'antd/lib/time-picker';

export type TimePickerProps = Omit<ATimePickerProps, 'value'> & {
  /** 根据format格式化值处理，默认true，可设置为utc获取时间戳格式值 */
  valueFormat?: 'utc' | boolean;
  value?: number | string | Moment;
};

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { onChange, value, valueFormat, format, ...restProps } = props;

  const onFormatChange = (time, dateString) => {
    let finalTime = time;

    if (valueFormat === 'utc') {
      finalTime = time?.valueOf();
    } else if (valueFormat) {
      finalTime = time?.format(format);
    }

    onChange?.(finalTime, dateString);
  };

  let finalValue = value;
  if (value) {
    finalValue = moment(value, valueFormat === true ? format : undefined);
  }

  return <ATimePicker {...restProps} format={format} onChange={onFormatChange} value={finalValue as Moment} />;
};

TimePicker.defaultProps = {
  valueFormat: true,
};
