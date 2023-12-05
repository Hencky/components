import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactElement,
  type ForwardedRef,
  type PropsWithChildren,
} from 'react';
import { uniqueId } from 'lodash';
import { Table, Form } from 'antd';
import { EditableTableCell } from './Cell';
import { TextActions, ButtonAction } from '../../Actions';
import { type TableProps, type ColumnType } from 'antd/lib/table';
import { type FormItemProps } from '../../FormItem';

const { useForm } = Form;

export type ColumnDataWithId<T> = T & { id: string };

export interface EditableTableInstance<T = any> {
  add: (values: T) => void;
}

export interface EditableTableProps<T = any> extends Omit<TableProps<T>, 'value' | 'onChange' | 'columns'> {
  value?: ColumnDataWithId<T>[];
  onChange?: (value?: ColumnDataWithId<T>[]) => void;
  columns: (ColumnType<T> & { editFormItemProps?: FormItemProps; editNode?: React.ReactNode })[];
}

function IEditableTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableTableProps<RecordType>>,
  ref: ForwardedRef<EditableTableInstance<RecordType>>
) {
  const { value = [], onChange, columns = [], ...restProps } = props;

  const [form] = useForm();
  const [editingKey, setEditingKey] = useState('');
  const [dataSource, setDataSource] = useState<ColumnDataWithId<RecordType>[]>(value);

  const isAddRef = useRef(false);

  const isEditing = (record) => record.id === editingKey;

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        title: col.title,
        name: col.key,
        formItemProps: col.editFormItemProps,
        editing: isEditing(record),
        editNode: col.editNode,
      }),
    };
  });

  useImperativeHandle(
    ref,
    () => ({
      add: (values) => {
        if (editingKey) return;
        const id = uniqueId('');
        const newValue = [...dataSource, { id, ...values }];
        setDataSource(newValue);
        onChange?.(newValue);
      },
    }),
    []
  );

  const emitValue = () => {
    onChange?.(dataSource);
  };

  const save = async (id) => {
    const row = await form.validateFields();
    const newData = [...dataSource];
    const index = newData.findIndex((item) => id === item.id);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setDataSource(newData);
      setEditingKey('');
      emitValue();
    }
  };

  const deleteRow = (id) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => id === item.id);
    newData.splice(index, 1);
    setDataSource(newData);
  };

  return (
    <Form component="div" form={form}>
      <Table
        rowKey={'id'}
        bordered
        pagination={false}
        {...restProps}
        dataSource={dataSource}
        components={{ body: { cell: EditableTableCell } }}
        columns={
          [
            ...mergedColumns,
            {
              key: 'operator',
              title: '操作',
              fixed: 'right',
              width: 120,
              render: (_, record) => {
                return (
                  <TextActions
                    actions={[
                      {
                        children: '编辑',
                        type: 'primary',
                        render: editingKey !== record.id,
                        disabled: !!editingKey && editingKey !== record.id,
                        onClick: () => {
                          isAddRef.current = false;
                          setEditingKey(record.id);
                          form.setFieldsValue(record);
                        },
                      },
                      {
                        children: '保存',
                        type: 'primary',
                        render: editingKey === record.id,
                        onClick: async () => {
                          await save(record.id);
                          isAddRef.current = false;
                          setEditingKey('');
                          form.resetFields();
                        },
                      },
                      {
                        children: '取消',
                        type: 'primary',
                        render: editingKey === record.id,
                        onClick: () => {
                          if (isAddRef.current) {
                            deleteRow(record.id);
                          }

                          setEditingKey('');
                          form.resetFields();
                        },
                      },
                      {
                        children: '删除',
                        type: 'primary',
                        render: !editingKey,
                        onClick: () => {
                          deleteRow(record.id);
                          emitValue();
                        },
                      },
                    ]}
                  />
                );
              },
            },
          ] as ColumnType<RecordType>[]
        }
      />
      <ButtonAction
        {...{
          style: { marginTop: 24 },
          children: '新增',
          type: 'primary',
          block: true,
          onClick: () => {
            if (editingKey) return;
            isAddRef.current = true;
            const id: string = uniqueId('');
            setDataSource([...dataSource, { id } as ColumnDataWithId<RecordType>]);
            setEditingKey(id);
          },
        }}
      />
    </Form>
  );
}

export const EditableTable = forwardRef<EditableTableInstance, EditableTableProps>(IEditableTable) as <
  RecordType extends Record<string, any> = any
>(
  props: PropsWithChildren<EditableTableProps<RecordType>> & { ref?: React.Ref<EditableTableInstance<RecordType>> }
) => ReactElement;
