import React from 'react';
import { message } from 'antd';
import { Table, type ColumnType, TextActions } from '@pms/ui';
import { remoteDataSource, columns, type RecordType } from './config';

const Demo = () => {
  const cols: ColumnType<RecordType>[] = [
    ...columns,
    {
      key: 'operator',
      title: '操作',
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

  return <Table<RecordType> columns={cols} remoteDataSource={remoteDataSource} />;
};

export default Demo;
