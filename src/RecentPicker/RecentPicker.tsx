import React, { useEffect, useRef, useState } from 'react';
import { Radio, Space, DatePicker } from 'antd';
import type { Moment } from 'moment';
import type { RangeValue } from 'rc-picker/lib/interface';
import type { RangePickerProps } from 'antd/lib/date-picker';

const { RangePicker } = DatePicker;

export type RecentPickerValue<T> = T | RangeValue<Moment>;

export interface RecentPickerProps<T extends { label: string; value: any }> {
  onChange?: (value: RecentPickerValue<T['value']>) => void;
  value?: RecentPickerValue<T['value']>;
  defaultValue?: RangeValue<Moment>;
  options?: T[];
  rangePickerProps?: RangePickerProps;
}

const CUSTOM_VALUE = '__custom_value';

export const RecentPicker: <T extends { label: string; value: any }>(
  props: React.PropsWithChildren<RecentPickerProps<T>>,
) => React.ReactElement = (props) => {
  const { onChange, value, options = [], defaultValue, rangePickerProps = {} } = props;

  const finalOptions = [...options, { label: '自定义', value: CUSTOM_VALUE }];

  const isSettingValue = typeof value === 'string' || typeof value === 'number';

  const [type, setType] = useState(isSettingValue ? value : value ? CUSTOM_VALUE : finalOptions[0].value);
  const [searchData, setSearchData] = useState<RangeValue<Moment>>(isSettingValue ? undefined : value);
  const isChangeLock = useRef(false);
  const mountRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    if (type === CUSTOM_VALUE && !searchData) {
      isChangeLock.current = true;
      setSearchData(defaultValue);
    }

    if (type !== CUSTOM_VALUE) {
      onChange?.(type);
    }
  }, [type]);

  useEffect(() => {
    if (!mountRef.current) return;

    if (type === CUSTOM_VALUE && !isChangeLock.current) {
      onChange?.(searchData);
    }
    isChangeLock.current = false;
  }, [type, searchData]);

  useEffect(() => {
    mountRef.current = true;
  }, []);

  return (
    <Space>
      <Radio.Group
        value={type}
        onChange={(e) => setType(e.target.value)}
        buttonStyle="solid"
        optionType="button"
        options={finalOptions}
      />
      {type === CUSTOM_VALUE && (
        <RangePicker
          value={searchData}
          onChange={([startVal, endVal]) => {
            setSearchData([startVal.startOf('day'), endVal.endOf('day')]);
          }}
          {...rangePickerProps}
          allowClear
          autoFocus
        />
      )}
    </Space>
  );
};