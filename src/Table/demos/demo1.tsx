import React from 'react';
import { Table } from '@pms/ui';
import { remoteDataSource, columns, type RecordType } from './config';

const Demo = () => {
  return <Table<RecordType> rowKey="id" columns={columns} remoteDataSource={remoteDataSource} />;
};

export default Demo;
