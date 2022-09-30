import React from 'react';
import { DatePicker } from '@lucky-bird/ui';
import { Space } from 'antd';
import moment from 'moment';

const Demo = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  return (
    <Space direction="vertical">
      <Space>
        <span>默认为TimeString格式</span>
        <DatePicker onChange={onChange} />
      </Space>
      <Space>
        <span>使用moment格式</span>
        <DatePicker valueFormat={false} onChange={onChange} />
      </Space>
      <Space>
        <span>UTC时间格式</span>
        <DatePicker valueFormat={'utc'} onChange={onChange} />
      </Space>
      <Space>
        <span>format YYYY-MM</span>
        <DatePicker format={'YYYY-MM'} onChange={onChange} picker="month" />
      </Space>
      <Space>
        <span>format YYYY-MM-DD HH/mm/ss</span>
        <DatePicker showTime format={'YYYY-MM-DD HH/mm/ss'} onChange={onChange} />
      </Space>
      <Space>
        <span>UTC回显</span>
        <DatePicker valueFormat={'utc'} value={1653446642066} />
      </Space>
      <Space>
        <span>moment回显</span>
        <DatePicker valueFormat={false} value={moment('2022-01-01')} />
      </Space>
      <Space>
        <span>TimeString回显</span>
        <DatePicker valueFormat={true} value={'2022-01-01'} />
      </Space>
      <Space>
        <span>TimeString回显</span>
        <DatePicker valueFormat={true} showTime value={'2022-01-01 12:12:12'} />
      </Space>
    </Space>
  );
};

export default Demo;
