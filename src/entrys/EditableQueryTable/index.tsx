import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactElement,
  type ForwardedRef,
  type PropsWithChildren,
} from 'react';
import { Form } from 'antd';
import { uniqueId } from 'lodash';
import { QueryTable, type QueryTableProps, type QueryTableColumnType, type QueryTableInstance } from '../../QueryTable';
import { EditableTableCell } from '../EditableTable/Cell';
import { TextActions } from '../../Actions';
import { type FormItemProps } from '../../FormItem';

const { useForm } = Form;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditableQueryTableInstance<T extends Record<string, any> = any> extends QueryTableInstance<T> {}

export interface EditableQueryTableProps<T extends Record<string, any> = any>
  extends Omit<QueryTableProps<T>, 'value' | 'onChange' | 'columns'> {
  columns: (QueryTableColumnType<T> & {
    editFormItemProps?: FormItemProps;
    editNode?: React.ReactNode;
  })[];
  onDelete?: (id: string | number) => void;
  onSave?: (data: { id?: string | number } & T) => void;
  onChange?: (value: T[]) => void;
}

function IEditableQueryTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableQueryTableProps<RecordType>>,
  ref: ForwardedRef<EditableQueryTableInstance<RecordType>>
) {
  const { onChange, columns = [], rowSelection, onSave, onDelete, ...restProps } = props;

  const [form] = useForm();
  const [editingKey, setEditingKey] = useState('');

  const querytableRef = useRef<QueryTableInstance>();
  const isAddRef = useRef(false);
  const memoDataSource = useRef<RecordType[]>();

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
      ...(querytableRef.current! || {}),
      add: (values) => {},
    }),
    []
  );

  const save = async (id) => {
    querytableRef.current?.table.setLoading(true);
    const row = await form.validateFields();
    await onSave?.({ ...row, id: isAddRef.current ? undefined : id });
    querytableRef.current?.table.setLoading(false);
  };

  const add = () => {
    if (editingKey) return;
    isAddRef.current = true;
    const dataSouce = querytableRef.current?.table.getDataSource() || [];
    memoDataSource.current = [...dataSouce];
    const newId = uniqueId('__self__add_click__');
    querytableRef.current?.table.setDataSource([{ id: newId }, ...dataSouce]);
    setEditingKey(newId);
  };

  return (
    <Form component="div" form={form}>
      <QueryTable
        rowKey={'id'}
        ref={querytableRef}
        tableProps={{
          bordered: true,
          components: { body: { cell: EditableTableCell } },
        }}
        rowSelection={
          rowSelection
            ? {
                ...rowSelection,
                onSelect: (selectedRow, _, selectedRows) => {
                  onChange?.(selectedRows);
                },
              }
            : false
        }
        actions={[
          {
            children: '新增',
            type: 'primary',
            onClick: () => {
              add();
            },
          },
        ]}
        {...restProps}
        columns={
          [
            ...mergedColumns,
            {
              key: 'operator',
              title: '操作',
              fixed: 'right',
              width: 120,
              render: ({ record }) => {
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
                          querytableRef.current?.table.refresh();
                        },
                      },
                      {
                        children: '取消',
                        type: 'primary',
                        render: editingKey === record.id,
                        onClick: () => {
                          if (isAddRef.current) {
                            querytableRef.current?.table.setDataSource(memoDataSource.current!);
                            isAddRef.current = false;
                          }
                          setEditingKey('');
                          form.resetFields();
                        },
                      },
                      {
                        children: '删除',
                        type: 'primary',
                        confirm: '确认删除?',
                        render: !editingKey,
                        onClick: async () => {
                          await onDelete?.(record.id);
                          querytableRef.current?.table.refresh();
                        },
                      },
                    ]}
                  />
                );
              },
            },
          ] as QueryTableColumnType<RecordType>[]
        }
      />
    </Form>
  );
}

export const EditableQueryTable = forwardRef<EditableQueryTableInstance, EditableQueryTableProps>(
  IEditableQueryTable
) as <RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableQueryTableProps<RecordType>> & {
    ref?: React.Ref<EditableQueryTableInstance<RecordType>>;
  }
) => ReactElement;
