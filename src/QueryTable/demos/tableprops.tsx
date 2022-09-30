import React from 'react';
import {
  QueryTable,
  TextActions,
  QueryTableActions,
  QueryTableColumnType,
  FormGroup,
  QueryTableColumnRenderContext,
} from '@lucky-bird/ui';
import { Input, message } from 'antd';
import { remoteDataSource, columns, type RecordType } from '../../Table/demos/config';

const fields = [
  {
    name: 'senderName',
    label: '发送人姓名',
    rules: [{ message: '请输入', required: true }],
    children: <Input placeholder="请输入" />,
  },
];

const ModalForm = () => {
  return <FormGroup fields={fields} />;
};

const actions: QueryTableActions[] = [
  {
    children: '刷新',
    type: 'primary',
    onClick: (e, ctx) => {
      ctx.table.refresh()?.then(() => {
        message.success('新建成功');
      });
    },
  },
  {
    children: '新增',
    type: 'primary',
    onClick: (e, ctx) => {
      ctx.modal.open({
        title: '新建',
        children: <ModalForm />,
        onOk() {
          ctx.modal.close();
          ctx.table.refresh();
        },
      });
    },
  },
];

const Demo = () => {
  const getOperatorActions = (ctx: QueryTableColumnRenderContext) => {
    return [
      {
        children: '编辑',
        onClick: () => {
          ctx.modal.open({
            title: '编辑',
            initialValues: ctx.record,
            children: <ModalForm />,
            onOk() {
              ctx.modal.close();
              ctx.table.refresh();
            },
          });
        },
      },
      {
        children: '删除',
        confirm: '确认删除?',
        onClick: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              message.success('删除成功');
              resolve('');
            }, 1000);
          }).then(() => {
            ctx.table.refresh();
          });
        },
      },
    ];
  };

  const cols: QueryTableColumnType<RecordType>[] = [
    ...columns,
    {
      key: 'operator',
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (ctx) => {
        return <TextActions actions={getOperatorActions(ctx)} />;
      },
    },
  ];

  return (
    <QueryTable
      fields={fields.map((item) => ({ ...item, rules: [] }))}
      columns={cols}
      tableProps={{
        scroll: {
          x: 1300,
        },
      }}
      // leftActions={actions}
      actions={actions}
      remoteDataSource={remoteDataSource}
    />
  );
};

export default Demo;
