import React from 'react';
import { message } from 'antd';
import { Table, type ColumnType, TextActions } from '@pms/ui';
import { remoteDataSource, columns, type RecordType } from './config';

import 'antd/lib/table/style/index.css';

const Demo = () => {
  const cols: ColumnType<RecordType>[] = [
    ...columns,
    {
      key: 'id',
      render: (ctx) => {
        return (
          <TextActions
            actions={[
              {
                children: '刷新',
                confirm: '确认刷新?',
                onClick: () => {
                  console.log('刷新');
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      ctx.table.refresh();
                      resolve('');
                      message.success('刷新成功');
                    }, 1000);
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return <Table<RecordType> rowKey="id" columns={cols} remoteDataSource={remoteDataSource} />;
};

export default Demo;
