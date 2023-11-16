import React from 'react';
import moment, { type Moment } from 'moment';
import { DatePicker as ADatePicker } from 'antd';
import type { RangePickerProps as ARangePickerProps } from 'antd/lib/date-picker';

const { RangePicker: ARangePicker } = ADatePicker;

export type RangePickerProps = Omit<ARangePickerProps, 'value'> & {
  /** 根据format格式化值处理，默认true，可设置为utc获取时间戳格式值 */
  valueFormat?: 'utc' | boolean;
  value?: (number | string | Moment)[];
  /** 根据showTime区分TimePicker，ADatePickerProps里没有这个类型 */
  showTime?: boolean;
};

export const RangePicker: React.FC<RangePickerProps> = (props) => {
  const { onChange, value, valueFormat, format, ...restProps } = props;

  const onFormatChange = (time, dateString) => {
    let finalTime = time;

    if (valueFormat === 'utc') {
      finalTime = time?.map((t) => t?.valueOf());
    } else if (valueFormat) {
      finalTime = time?.map((t) => t?.format(format));
    }

    onChange?.(finalTime, dateString);
  };

  let finalValue = value;
  if (value) {
    finalValue = value.map((t) => moment(t, valueFormat === true ? !!format : undefined));
  }

  return <ARangePicker picker="date" {...restProps} onChange={onFormatChange} value={finalValue as [Moment, Moment]} />;
};

RangePicker.defaultProps = {
  valueFormat: true,
};
