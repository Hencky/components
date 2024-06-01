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
import { TextActionProps, TextActions } from '../../Actions';
import type { EditableTableColumnType } from '../EditableTable';
import { getColumns } from '../EditableTable/utils';
import { EDITABLETABLE_ID_PREFIX } from '../EditableTable';

const { useForm } = Form;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EditableQueryTableInstance<T extends Record<string, any> = any> extends QueryTableInstance<T> {}

export interface EditableQueryTableProps<T extends Record<string, any> = any>
  extends Omit<QueryTableProps<T>, 'value' | 'onChange' | 'columns'> {
  columns: EditableTableColumnType<T>[];
  onDelete?: (id: string | number) => void;
  onSave?: (data: { id?: string | number } & T) => void;
  onChange?: (value: T[]) => void;
  disabled?: boolean;
  enableOperator?: boolean;
  /** 操作栏额外操作按钮 */
  operators?: TextActionProps[];
  /** 操作栏属性 */
  operatorProps?: QueryTableColumnType<T>;
  /** 渲染编辑按钮 */
  editButtonRender?: (data: T) => boolean;
  /** 渲染删除按钮 */
  deleteButtonRender?: (data: T) => boolean;
}

function IEditableQueryTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableQueryTableProps<RecordType>>,
  ref: ForwardedRef<EditableQueryTableInstance<RecordType>>
) {
  const {
    onChange,
    columns = [],
    rowSelection,
    onSave,
    onDelete,
    disabled,
    enableOperator = true,
    operators = [],
    operatorProps = {},
    tableProps,
    formProps,
    editButtonRender,
    deleteButtonRender,
    rowKey = 'id',
    ...restProps
  } = props;

  const [form] = useForm();
  const [editingKey, setEditingKey] = useState('');

  const querytableRef = useRef<QueryTableInstance>();
  const isAddRef = useRef(false);
  const memoDataSource = useRef<RecordType[]>();

  const enableEdit = !!editingKey;

  const mergedColumns = getColumns(columns, { disabled, rowKey, editingKey, baseRender: true });

  const add = () => {
    if (editingKey) return;
    isAddRef.current = true;
    const dataSouce = querytableRef.current?.tableRef.current!.getDataSource() || [];
    memoDataSource.current = [...dataSouce];
    const newId = uniqueId(EDITABLETABLE_ID_PREFIX);
    querytableRef.current?.table.setDataSource([{ id: newId, _new: true }, ...dataSouce]);
    setEditingKey(newId);
  };

  useImperativeHandle(
    ref,
    () => ({
      ...(querytableRef.current! || {}),
      add,
    }),
    [querytableRef.current]
  );

  const save = async (id) => {
    querytableRef.current?.table.setLoading(true);
    try {
      const row = await form.validateFields();
      await onSave?.({ ...row, id: isAddRef.current ? undefined : id });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      throw new Error('e');
    } finally {
      querytableRef.current?.table.setLoading(false);
    }
  };

  return (
    <Form component="div" form={form}>
      <QueryTable
        rowKey={rowKey}
        // @ts-expect-error
        ref={querytableRef}
        tableProps={{
          bordered: true,
          ...tableProps,
          components: { body: { cell: EditableTableCell } },
          pagination: { disabled: enableEdit },
        }}
        rowSelection={
          rowSelection
            ? {
                // @ts-expect-error
                ...rowSelection,
                onSelect: (selectedRow, _, selectedRows) => {
                  onChange?.(selectedRows);
                },
                onSelectAll: (_, selectedRows) => {
                  onChange?.(selectedRows);
                },
              }
            : false
        }
        formProps={{
          ...formProps,
          disabled: enableEdit,
          queryActionProps: { disabled: enableEdit },
          resetActionProps: { disabled: enableEdit },
        }}
        actions={
          disabled || !enableOperator
            ? []
            : [
                {
                  children: '新增',
                  type: 'primary',
                  disabled: enableEdit,
                  onClick: () => {
                    add();
                  },
                },
              ]
        }
        {...restProps}
        // @ts-expect-error
        columns={
          enableOperator
            ? ([
                ...mergedColumns,
                {
                  key: 'operator',
                  title: '操作',
                  fixed: 'right',
                  width: 120,
                  ...operatorProps,
                  render: ({ record }) => {
                    return (
                      <TextActions
                        actions={[
                          {
                            children: '编辑',
                            type: 'primary',
                            render: editingKey !== record.id && (editButtonRender ? editButtonRender(record) : true),
                            disabled: enableEdit && editingKey !== record.id,
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
                            render: !editingKey && (deleteButtonRender ? deleteButtonRender(record) : true),
                            onClick: async () => {
                              await onDelete?.(record.id);
                              querytableRef.current?.table.refresh();
                            },
                          },
                          ...operators,
                        ]}
                      />
                    );
                  },
                },
              ] as QueryTableColumnType<RecordType>[])
            : mergedColumns
        }
      />
    </Form>
  );
}

export const EditableQueryTable = forwardRef<EditableQueryTableInstance, EditableQueryTableProps>(
  IEditableQueryTable
) as <RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableQueryTableProps<RecordType>> & {
    // @ts-ignore
    ref?: React.Ref<EditableQueryTableInstance<RecordType>>;
  }
) => ReactElement;
