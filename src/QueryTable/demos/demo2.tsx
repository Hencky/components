import React, { useEffect } from 'react';
import {
  QueryTable,
  TextActions,
  QueryTableColumnType,
  FormGroup,
  QueryTableActions,
  QueryTableInstance,
} from '@pms/ui';
import { Input, message, Form, FormInstance } from 'antd';
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

const ModalForm = (props: { form: FormInstance }) => {
  const { form } = props;

  return (
    <Form form={form}>
      <FormGroup fields={modalFields} />
    </Form>
  );
};

const Demo = () => {
  const [form] = Form.useForm();

  const getModalConfig = (ctx: QueryTableInstance & { record?: any }) => {
    return {
      title: '弹框标题',
      width: 800,
      children: <ModalForm form={form} />,
      onCancel: () => {
        form.resetFields();
      },
      onOpen() {
        form.setFieldsValue(ctx?.record);
      },
      onOk() {
        return form.validateFields().then(() => {
          const values = form.getFieldsValue(true);
          return new Promise((resolve) => {
            setTimeout(() => {
              console.log('values', values);
              ctx.modal.close();
              ctx.table.refresh();
              resolve('');
            }, 2000);
          });
        });
      },
    };
  };

  const actions: QueryTableActions[] = [
    {
      children: '新增',
      type: 'primary',
      onClick: (e, ctx) => {
        ctx.modal.open(getModalConfig(ctx));
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
                  const { modal } = ctx;
                  modal.open(getModalConfig(ctx));
                  // form.setFieldsValue(ctx.record);
                },
              },
              {
                children: '修改',
                onClick: (e) => {
                  const { modal } = ctx;
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      // return promise先请求数据，再打开弹框
                      modal.open(getModalConfig(ctx));
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
