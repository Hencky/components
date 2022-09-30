import React from 'react';
import { Select } from 'lucky-bird-ui';

const Demo = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  return (
    <Select
      style={{ width: 200 }}
      dataSource={[
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ]}
      placeholder="请选择"
      onChange={onChange}
    />
  );
};

export default Demo;
