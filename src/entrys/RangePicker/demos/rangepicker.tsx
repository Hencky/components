import React from 'react';
import { RangePicker } from 'lucky-bird-ui';
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
        <RangePicker onChange={onChange} />
      </Space>
      <Space>
        <span>使用moment格式</span>
        <RangePicker valueFormat={false} onChange={onChange} />
      </Space>
      <Space>
        <span>UTC时间格式</span>
        <RangePicker valueFormat={'utc'} onChange={onChange} />
      </Space>
      <Space>
        <span>format YYYY-MM</span>
        <RangePicker format={'YYYY-MM'} onChange={onChange} picker="month" />
      </Space>
      <Space>
        <span>format YYYY-MM-DD HH/mm/ss</span>
        <RangePicker showTime format={'YYYY-MM-DD HH/mm/ss'} onChange={onChange} />
      </Space>
      <Space>
        <span>UTC回显</span>
        <RangePicker valueFormat={'utc'} value={[1653446642066, 1653446643066]} />
      </Space>
      <Space>
        <span>moment回显</span>
        <RangePicker valueFormat={false} value={[moment('2022-01-01'), moment('2022-02-01')]} />
      </Space>
      <Space>
        <span>TimeString回显</span>
        <RangePicker valueFormat={true} value={['2022-01-01', '2022-02-01']} />
      </Space>
      <Space>
        <span>TimeString回显</span>
        <RangePicker valueFormat={true} showTime value={['2022-01-01 12:12:12', '2022-02-01 12:12:12']} />
      </Space>
    </Space>
  );
};

export default Demo;
