import React from 'react';
import { QueryTable } from '@pms/ui';
import { Input, message } from 'antd';
import { ButtonActionProps } from '@pms/ui';
import { remoteDataSource } from '../../Table/demos/config';

const columns = [
  {
    title: 'title1',
    dataIndex: 'a',
    key: 'title1',
  },
  {
    title: 'title2',
    dataIndex: 'b',
    key: 'title3',
  },
];

const fields = [
  {
    name: 'name',
    label: '名称',
    children: <Input placeholder="请输入" />,
  },
];

const actions: ButtonActionProps[] = [
  {
    children: '新增',
    type: 'primary',
    onClick: () => {
      message.success('新建成功');
    },
  },
];

const Demo = () => {
  return (
    <QueryTable
      fields={fields}
      columns={columns}
      // leftActions={actions}
      actions={actions}
      remoteDataSource={remoteDataSource}
    />
  );
};

export default Demo;
