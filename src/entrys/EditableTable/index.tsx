import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  type ReactElement,
  type ForwardedRef,
  type PropsWithChildren,
  useEffect,
} from 'react';
import { isEqual, uniqueId } from 'lodash';
import { Table, Form } from 'antd';
import { EditableTableCell } from './Cell';
import { TextActions, ButtonAction } from '../../Actions';
import { type TableProps, type ColumnType } from 'antd/lib/table';
import { type FormItemProps } from '../../FormItem';
import { FormInstance } from 'antd/es/form';

const { useForm } = Form;

export type ColumnDataWithId<T> = T & { id: string };

export interface EditableTableInstance<T = any> {
  add: (values: T) => void;
}

export interface EditableTableProps<T = any> extends Omit<TableProps<T>, 'value' | 'onChange' | 'columns'> {
  value?: ColumnDataWithId<T>[];
  onChange?: (value?: ColumnDataWithId<T>[]) => void;
  columns: (ColumnType<T> & {
    editFormItemProps?: FormItemProps;
    renderEditNode?: (form: FormInstance) => React.ReactNode;
  })[];
  disabled?: boolean;

  max?: number;
}

function IEditableTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<EditableTableProps<RecordType>>,
  ref: ForwardedRef<EditableTableInstance<RecordType>>
) {
  const { value, onChange, columns = [], disabled, max, ...restProps } = props;

  const [form] = useForm();
  const [editingKey, setEditingKey] = useState('');
  const [dataSource, setDataSource] = useState<ColumnDataWithId<RecordType>[]>([]);

  useEffect(() => {
    if (isEqual(value, dataSource)) return;
    setDataSource(value || []);
  }, [value]);

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
        renderEditNode: col.renderEditNode,
      }),
    };
  });

  useImperativeHandle(
    ref,
    () => ({
      add: (values) => {
        if (editingKey) return;
        const id = uniqueId('');
        const newValue = [...dataSource, { ...values, id }];
        onChange?.(newValue);
        setDataSource(newValue);
      },
    }),
    [dataSource, editingKey]
  );

  const save = async (id) => {
    const row = await form.validateFields();
    const newData = [...dataSource];
    const index = newData.findIndex((item) => id === item.id);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setDataSource(newData);
      onChange?.(newData);
    }
  };

  const deleteRow = (id) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => id === item.id);
    newData.splice(index, 1);
    setDataSource(newData);
    onChange?.(newData);
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
          render: !disabled && (max ? max > dataSource.length : true),
          disabled: !!editingKey,
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
  props: PropsWithChildren<EditableTableProps<RecordType>> & {
    ref?: React.Ref<EditableTableInstance<RecordType>>;
  }
) => ReactElement;
