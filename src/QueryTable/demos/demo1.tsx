import React from 'react';
import { QueryTable, TextActions, ButtonActionProps, QueryTableColumnType } from '@pms/ui';
import { Input, message } from 'antd';
import { remoteDataSource, columns, type RecordType } from '../../Table/demos/config';

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
  const cols: QueryTableColumnType<RecordType>[] = [
    ...columns,
    {
      key: 'operator',
      render: (ctx) => {
        return (
          <TextActions
            actions={[
              {
                children: '刷新',
                onClick: () => {
                  console.log('ctx', ctx);
                  message.success('刷新成功');
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <QueryTable
      fields={fields}
      columns={cols}
      // leftActions={actions}
      actions={actions}
      remoteDataSource={remoteDataSource}
    />
  );
};

export default Demo;
