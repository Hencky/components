import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  type PropsWithChildren,
  type ReactElement,
  type ForwardedRef,
} from 'react';
import cls from 'classnames';
import { Form } from 'antd';
import { QueryForm, type QueryFormProps } from '../QueryForm';
import { Table, type TableProps, type TableInstance, type ColumnType } from '../Table';
import { ButtonActions, type ButtonActionProps } from '../Actions';
import { Modal, type ModalInstance } from '../Modal';
import type { FormInstance } from 'antd/lib/form';
import { usePrefix } from '../_hooks';

import './index.less';

export interface QueryTableInstance<RecordType = any> {
  form: FormInstance;
  table: TableInstance<RecordType>;
  modal: ModalInstance;
}

type OutsideTableType = 'remoteDataSource' | 'columns' | 'rowKey' | 'rowSelection';

export interface QueryTableActions extends Omit<ButtonActionProps, 'onClick'> {
  onClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    ctx: { form: FormInstance; table: TableInstance; modal: ModalInstance }
  ) => void;
}

export interface QueryTableColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'render'> {
  render?: (ctx: {
    value: RecordType;
    index: number;
    record: RecordType;
    form: FormInstance;
    table: TableInstance;
    modal: ModalInstance;
  }) => ReactElement;
}

export interface QueryTableProps<RecordType extends Record<string, any> = any>
  extends Omit<QueryFormProps, 'onSubmit' | 'onReset' | 'form'>,
    Pick<TableProps, Exclude<OutsideTableType, 'columns'>> {
  columns: QueryTableColumnType<RecordType>[];
  tableProps?: Omit<TableProps<RecordType>, OutsideTableType>;
  leftActions?: QueryTableActions[];
  actions?: QueryTableActions[];
}

function BaseQueryTable<RecordType extends Record<string, any> = any>(
  props: QueryTableProps<RecordType>,
  ref: ForwardedRef<QueryTableInstance<RecordType>>
) {
  const prefix = usePrefix('querytable');
  const {
    fields,
    initialValues,
    showFieldsLength,
    rowKey,
    columns,
    rowSelection,
    remoteDataSource,
    tableProps,
    leftActions,
    actions,
  } = props;

  const [form] = Form.useForm();

  const tableRef = useRef<TableInstance>(null);
  const modalRef = useRef<ModalInstance>(null);

  // ===== 点击查询按钮，恢复第一页 ======
  const onSubmit = (values) => {
    const currentPagination = tableRef.current!.getPagination();
    tableRef.current!.setPagination({ ...currentPagination, current: 1 });
    return tableRef.current!.refresh(values);
  };

  // ===== 重置 =====
  const onReset = () => {
    return tableRef.current!.reset();
  };

  useImperativeHandle(ref, () => ({
    form,
    table: tableRef.current!,
    modal: modalRef.current!,
  }));

  // ===== 改写columns，render支持form和table实例，省略dataIndex配置 =====
  // TODO: 暂不支持children属性
  const renderColumns = (): ColumnType<RecordType>[] => {
    return columns.map((column) => {
      const finalRender = column.render
        ? ({ value, record, index }) => {
            return column.render!({ value, record, index, table: tableRef.current!, form, modal: modalRef.current! });
          }
        : undefined;
      return {
        ...column,
        render: finalRender,
      };
    });
  };

  // ===== 操作按钮渲染，改写onClick，支持form和table实例 =====
  // TODO: 目前仅支持ButtonAction，后续如有需要，根据actionType支持其他类型
  const renderActions = () => {
    const getActions = (actions: QueryTableActions[] = []): ButtonActionProps[] => {
      return actions?.map((item) => {
        return {
          ...item,
          onClick: (e) => {
            return item.onClick(e, { form, table: tableRef.current!, modal: modalRef.current! });
          },
        };
      });
    };

    const leftAcionRender = <ButtonActions actions={getActions(leftActions)} />;
    const rightActionRender = <ButtonActions actions={getActions(actions)} />;

    return (
      <div
        className={cls({
          [prefix + '-actions']: true,
          [prefix + '-actions-empty']: !leftActions && !actions,
        })}
      >
        <div>{leftAcionRender}</div>
        <div>{rightActionRender}</div>
      </div>
    );
  };

  return (
    <div className={prefix}>
      <QueryForm
        form={form}
        fields={fields}
        initialValues={initialValues}
        showFieldsLength={showFieldsLength}
        onReset={onReset}
        onSubmit={onSubmit}
      />

      {renderActions()}

      <Table
        ref={tableRef}
        rowKey={rowKey}
        columns={renderColumns()}
        rowSelection={rowSelection}
        remoteDataSource={remoteDataSource}
        {...tableProps}
      />

      <Modal ref={modalRef} />
    </div>
  );
}

export const QueryTable = forwardRef<QueryTableInstance, QueryTableProps>(BaseQueryTable) as <RecordType = any>(
  props: PropsWithChildren<QueryTableProps<RecordType>> & { ref?: React.Ref<QueryTableInstance<RecordType>> }
) => ReactElement;
