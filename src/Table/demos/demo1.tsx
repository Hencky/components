import React from 'react';
import { Table } from '@pms/ui';
import { remoteDataSource } from './config';

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

const Demo = () => {
  return <Table rowKey="id" columns={columns} remoteDataSource={remoteDataSource} />;
};

export default Demo;
