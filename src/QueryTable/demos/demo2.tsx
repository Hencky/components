import React, { useEffect } from 'react';
import { QueryTable, TextActions, QueryTableColumnType, FormGroup, QueryTableActions } from '@pms/ui';
import { Input, message, Form } from 'antd';
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
  const { form, initialValues } = props;

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form form={form}>
      <FormGroup fields={modalFields} />
    </Form>
  );
};

const Demo = () => {
  const [form] = Form.useForm();

  const getModalConfig = (ctx?: any) => {
    return {
      title: '编辑',
      width: 800,
      children: <ModalForm form={form} initialValues={ctx?.record} />,
      onCancel: () => {
        form.resetFields();
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
