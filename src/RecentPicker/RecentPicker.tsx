import React, { useEffect, useRef, useState } from 'react';
import { Radio, Space, DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { isEqual } from 'lodash';
// @ts-ignore
import type { RangeValue } from 'rc-picker/lib/interface';
import type { RangePickerProps } from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;

export type RecentPickerValue<T> = T | RangeValue<Moment>;

export const typeList = ['day', 'week', 'month', 'quarter', 'year'];

export interface RecentPickerProps<T extends { label: string; value: any }> {
  onChange?: (value: RecentPickerValue<T['value']>) => void;
  value?: RecentPickerValue<T['value']>;
  defaultValue?: RangeValue<Moment>;
  options?: T[];
  rangePickerProps?: RangePickerProps;
  showRangePicker?: boolean;
}

const CUSTOM_VALUE = '__custom_value';

function getFormatTotalValue(value, format = 'YYYY-MM-DD HH:mm:ss') {
  return [moment().startOf(value).format(format), moment().endOf(value).format(format)];
}

function getTotalValue(value, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!value?.length) return;
  return [value[0].startOf('day').format(format), value[1].endOf('day').format(format)];
}

export const RecentPicker: <T extends { label: string; value: any }>(
  props: React.PropsWithChildren<RecentPickerProps<T>>
) => React.ReactElement = (props) => {
  const { onChange, value, options = [], defaultValue, rangePickerProps = {}, showRangePicker = false } = props;

  const finalOptions = showRangePicker ? options : [...options, { label: '自定义', value: CUSTOM_VALUE }];

  const isSettingValue = typeof value === 'string' || typeof value === 'number';

  const [type, setType] = useState(isSettingValue ? value : value ? CUSTOM_VALUE : finalOptions[0].value);
  const [searchData, setSearchData] = useState<RangeValue<Moment>>(isSettingValue ? undefined : value);
  const isChangeLock = useRef(false);
  const mountRef = useRef(false);
  const handleChagneLock = useRef(false);

  useEffect(() => {
    if (!type) return;

    if (showRangePicker) {
      const finalValue: RangeValue<Moment> = [moment().startOf(type), moment().endOf(type)];
      setSearchData(finalValue);
      if (!mountRef.current) return;
      onChange?.(finalValue);
      return;
    }

    if (!mountRef.current) return;

    if (type === CUSTOM_VALUE && !searchData) {
      isChangeLock.current = true;
      setSearchData(defaultValue);
    }

    if (type !== CUSTOM_VALUE) {
      onChange?.(type);
    }
  }, [type, showRangePicker]);

  useEffect(() => {
    if (!mountRef.current) return;
    if (!type && showRangePicker) {
      onChange?.(searchData);
    }

    if (type === CUSTOM_VALUE && !isChangeLock.current) {
      onChange?.(searchData);
    }
    isChangeLock.current = false;
  }, [type, searchData]);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  const handleFindType = (value) => {
    handleChagneLock.current = true;

    const current = options.find((item) => {
      const typeValue = getFormatTotalValue(item.value);
      return isEqual(typeValue, getTotalValue(value));
    });

    setType(current?.value || '');
  };

  const handleChange = (value) => {
    if (!value && showRangePicker) {
      setSearchData(undefined);
      handleFindType(undefined);
      return;
    }

    const [startVal, endVal] = value || [];
    setSearchData([startVal?.startOf('day'), endVal?.endOf('day')]);

    if (showRangePicker) {
      handleFindType(value);
    }
  };

  return (
    <Space>
      <Radio.Group
        value={type}
        onChange={(e) => setType(e.target.value)}
        buttonStyle="solid"
        optionType="button"
        options={finalOptions}
      />
      {(type === CUSTOM_VALUE || showRangePicker) && (
        <RangePicker value={searchData} onChange={handleChange} {...rangePickerProps} allowClear />
      )}
    </Space>
  );
};
