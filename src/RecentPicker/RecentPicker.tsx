import React, { useEffect, useRef, useState } from 'react';
import { Radio, Space, DatePicker } from 'antd';
import type { Moment } from 'moment';
import type { RangeValue } from 'rc-picker/lib/interface';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { CheckboxOptionType } from 'antd/lib/checkbox';

const { RangePicker } = DatePicker;

interface RecentPickerProps {
  onChange?: (value: any) => void;
  value?: any;
  defaultValue?: RangeValue<Moment>;
  options?: CheckboxOptionType[];
  rangePickerProps?: RangePickerProps;
}

const CUSTOM_VALUE = '__custom_value';

export const RecentPicker: React.FC<RecentPickerProps> = (props) => {
  const { onChange, value, options, defaultValue, rangePickerProps } = props;

  const finalOptions = [...options!, { label: '自定义', value: CUSTOM_VALUE }];

  const [type, setType] = useState(typeof value === 'string' ? value : value ? CUSTOM_VALUE : finalOptions[0].value);
  const [searchData, setSearchData] = useState<RangeValue<Moment>>(typeof value === 'string' ? undefined : value);
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
          onChange={(val) => {
            setSearchData(val);
          }}
          {...rangePickerProps}
          allowClear
          autoFocus
        />
      )}
    </Space>
  );
};

RecentPicker.defaultProps = {
  options: [],
  rangePickerProps: {},
};
