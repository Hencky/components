import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  type ReactElement,
  type ForwardedRef,
  type PropsWithChildren,
} from 'react';
import { isEqual, uniqueId } from 'lodash';
import { Table, Form } from 'antd';
import { EditableTableCell } from './Cell';
import { TextActions, ButtonAction } from '../../Actions';
import type { ColumnType, TableProps } from 'antd/lib/table';
import type { EditableTableColumnType, EditableTableAddPosition } from './interface';
import { getColumns } from './utils';

export * from './interface';

const { useForm } = Form;

export const EDITABLETABLE_ID_PREFIX = '__@__';

export interface EditableTableInstance<T = any> {
  add: (values: T) => void;
}

export interface EditableTableProps<T = any> extends Omit<TableProps<T>, 'value' | 'onChange' | 'columns' | 'rowKey'> {
  value?: T[];
  onChange?: (value?: T[]) => void;
  columns: EditableTableColumnType<T>[];
  disabled?: boolean;
  /** 限制长度 */
  max?: number;
  /** 显示新增按钮 */
  renderAddButton?: boolean;
  /** 保存时的回调函数 */
  onSave?: (data: T, record?: T) => Promise<any>;
  /** 删除时的回调函数 */
  onDelete?: (id: string) => Promise<any>;
  /** 删除按钮渲染 */
  deleteButtonRender?: (rowData: T) => boolean;
  /** 编辑按钮渲染 */
  editButtonRender?: (rowData: T) => boolean;
  /** 新增按钮位置, 默认底部 */
  addPosition?: EditableTableAddPosition;
  /** 标题渲染 */
  titleRender?: () => React.ReactNode;

  rowKey?: string;
}

function IEditableTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableTableProps<RecordType>>,
  ref: ForwardedRef<EditableTableInstance<RecordType>>
) {
  const {
    value,
    onChange,
    columns = [],
    disabled,
    max,
    renderAddButton = true,
    onSave,
    onDelete,
    titleRender,
    deleteButtonRender,
    editButtonRender,
    addPosition = 'bottom',
    rowKey = 'id',
    ...restProps
  } = props;

  const [form] = useForm();
  const [editingKey, setEditingKey] = useState('');
  const [dataSource, setDataSource] = useState<RecordType[]>([]);

  useEffect(() => {
    if (isEqual(value, dataSource)) return;
    setDataSource(value || []);
  }, [value]);

  const isAddRef = useRef(false);

  const mergedColumns = getColumns(columns, { rowKey, editingKey, disabled });

  useImperativeHandle(
    ref,
    () => ({
      add: async (values) => {
        if (editingKey) return;
        const id = uniqueId(EDITABLETABLE_ID_PREFIX);
        const newValue = [...dataSource, { ...values, _new: true, [rowKey]: id }];
        if (onSave) {
          await onSave(values);
        }
        setDataSource(newValue);
        onChange?.(newValue);
      },
    }),
    [dataSource, editingKey]
  );

  const save = async (id, record) => {
    await form.validateFields();
    const row = form.getFieldsValue(true);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => id === item[rowKey]);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      if (onSave) {
        await onSave(row, record);
      }
      setDataSource(newData);
      onChange?.(newData);
    }
  };

  const deleteRow = async (id, __self = false) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => id === item[rowKey]);
    newData.splice(index, 1);
    if (onDelete && !__self) {
      await onDelete(id);
    }
    setDataSource(newData);
    onChange?.(newData);
  };

  const enableAdd = renderAddButton && !disabled && (max ? max > dataSource.length : true);

  return (
    <Form component="div" form={form}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{titleRender?.()}</div>

        <ButtonAction
          {...{
            style: { marginBottom: 16 },
            children: '新增',
            type: 'primary',
            render: addPosition === 'top' && enableAdd,
            disabled: !!editingKey,
            onClick: () => {
              if (editingKey) return;
              isAddRef.current = true;
              const id: string = uniqueId(EDITABLETABLE_ID_PREFIX);
              setDataSource([{ [rowKey]: id, _new: true } as unknown as RecordType, ...dataSource]);
              setEditingKey(id);
            },
          }}
        />
      </div>

      <Table
        rowKey={rowKey}
        bordered
        pagination={false}
        {...restProps}
        dataSource={dataSource}
        components={{ body: { cell: EditableTableCell } }}
        // @ts-ignore
        columns={
          disabled
            ? mergedColumns
            : ([
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
                            render:
                              (editButtonRender ? editButtonRender(record) : true) && editingKey !== record[rowKey],
                            disabled: !!editingKey && editingKey !== record[rowKey],
                            onClick: () => {
                              isAddRef.current = false;
                              setEditingKey(record[rowKey]);
                              form.setFieldsValue(record);
                            },
                          },
                          {
                            children: '保存',
                            type: 'primary',
                            render: editingKey === record[rowKey],
                            onClick: async () => {
                              await save(record[rowKey], record);
                              isAddRef.current = false;
                              setEditingKey('');
                              form.resetFields();
                            },
                          },
                          {
                            children: '取消',
                            type: 'primary',
                            render: editingKey === record[rowKey],
                            onClick: () => {
                              if (isAddRef.current) {
                                deleteRow(record.id, true);
                              }

                              setEditingKey('');
                              form.resetFields();
                            },
                          },
                          {
                            children: '删除',
                            type: 'primary',
                            confirm: onDelete ? '确认删除？' : undefined,
                            render: !editingKey && (deleteButtonRender ? deleteButtonRender(record) : true),
                            onClick: async () => {
                              await deleteRow(record.id);
                              setEditingKey('');
                            },
                          },
                        ]}
                      />
                    );
                  },
                },
              ] as ColumnType<RecordType>[])
        }
      />
      <ButtonAction
        {...{
          style: { marginTop: 8 },
          children: '新增',
          type: 'dashed',
          block: true,
          render: addPosition === 'bottom' && enableAdd,
          disabled: !!editingKey,
          onClick: () => {
            if (editingKey) return;
            isAddRef.current = true;
            const id: string = uniqueId(EDITABLETABLE_ID_PREFIX);
            setDataSource([...dataSource, { [rowKey]: id, _new: true } as unknown as RecordType]);
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
  props: PropsWithChildren<EditableTableProps<RecordType>> & {
    // @ts-ignore
    ref?: React.Ref<EditableTableInstance<RecordType>>;
  }
) => ReactElement;
