import React from 'react';
import { TimePicker } from 'lucky-bird-ui';
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
        <TimePicker onChange={onChange} />
      </Space>
      <Space>
        <span>使用HH:mm:ss格式</span>
        <TimePicker format={'HH:mm:ss'} onChange={onChange} />
      </Space>
      <Space>
        <span>使用moment格式</span>
        <TimePicker valueFormat={false} onChange={onChange} />
      </Space>
      <Space>
        <span>UTC时间格式</span>
        <TimePicker valueFormat={'utc'} onChange={onChange} />
      </Space>
      <Space>
        <span>UTC回显</span>
        <TimePicker valueFormat={'utc'} value={1653446642066} />
      </Space>
      <Space>
        <span>moment回显</span>
        <TimePicker valueFormat={false} value={moment('2022-01-01 01:01:01')} />
      </Space>
      <Space>
        <span>TimeString回显</span>
        <TimePicker valueFormat={true} value={'2022-01-01 01:01:01'} />
      </Space>
      <Space>
        <span>TimeString回显</span>
        <TimePicker valueFormat={true} value={'2022-01-01 12:12:12'} />
      </Space>
    </Space>
  );
};

export default Demo;
