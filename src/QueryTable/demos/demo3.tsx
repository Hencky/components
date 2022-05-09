import React from 'react';
import {
  QueryTable,
  TextActions,
  QueryTableColumnType,
  FormGroup,
  QueryTableActions,
  QueryTableContext,
  ModalFormProps,
} from '@pms/ui';
import { Input, message } from 'antd';
import { remoteDataSource, columns, type RecordType } from '../../Table/demos/config';

const fields = [
  {
    name: 'senderName',
    label: '名称',
    children: <Input placeholder="请输入" />,
  },
];

const modalFields = [
  {
    name: 'senderName',
    label: '发送人',
    rules: [{ required: true }],
    children: <Input placeholder="请输入" />,
  },
];

const ModalForm = (props) => {
  // props里注入了form实例，或者通过antd4.20.x版本的form.useFormInstance拿form实例
  return <FormGroup fields={modalFields} />;
};

const Demo = () => {
  const getModalConfig = (ctx: QueryTableContext & { record?: any }): ModalFormProps => {
    return {
      title: '弹框标题',
      width: 800,
      children: <ModalForm />,
      initialValues: ctx?.record,
      onOk(e, { form }) {
        const values = form.getFieldsValue(true);
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('values', values);
            ctx.modalForm.close();
            ctx.table.refresh();
            resolve('');
          }, 2000);
        });
      },
    };
  };

  const actions: QueryTableActions[] = [
    {
      children: '新增',
      type: 'primary',
      onClick: (e, ctx) => {
        ctx.modalForm.open(getModalConfig(ctx));
      },
    },
  ];

  const cols: QueryTableColumnType<RecordType>[] = [
    ...columns,
    {
      key: 'operator',
      render: (ctx) => {
        return (
          <TextActions
            actions={[
              {
                children: '编辑',
                onClick: (e) => {
                  const { modalForm } = ctx;
                  modalForm.open(getModalConfig(ctx));
                },
              },
              {
                children: '修改',
                onClick: (e) => {
                  const { modalForm } = ctx;
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      // return promise先请求数据，再打开弹框
                      modalForm.open(getModalConfig(ctx));
                      resolve('');
                    }, 1000);
                  });
                },
              },
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
