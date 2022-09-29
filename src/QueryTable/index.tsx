import React, {
  useState,
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
import { ModalForm, type ModalFormInstance } from '../ModalForm';
import type { FormInstance } from 'antd/lib/form';
import { usePrefix } from '../_hooks';

import './index.less';

export interface QueryTableInstance<RecordType = any, Values = any> {
  form: FormInstance<Values>;
  table: TableInstance<RecordType>;
  modal: ModalFormInstance;
}

export type QueryTableContext<RecordType = any> = QueryTableInstance<RecordType>;

export type OutsideTableType = 'remoteDataSource' | 'columns' | 'rowKey' | 'rowSelection';

export interface QueryTableActions<RecordType = any> extends Omit<ButtonActionProps, 'onClick'> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>, ctx: QueryTableContext<RecordType>) => void;
}

export type QueryTableColumnRenderContext<RecordType = any> = {
  value: RecordType;
  index: number;
  record: RecordType;
} & QueryTableContext<RecordType>;

export interface QueryTableColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'render'> {
  render?: (ctx: QueryTableColumnRenderContext) => ReactElement;
}

export interface QueryTableProps<RecordType extends Record<string, any> = any, SearchValues = any>
  extends Pick<QueryFormProps<SearchValues>, 'fields' | 'initialValues' | 'showFieldsLength'>,
    Pick<TableProps, Exclude<OutsideTableType, 'columns'>> {
  columns: QueryTableColumnType<RecordType>[];
  tableProps?: Omit<TableProps<RecordType>, OutsideTableType>;
  leftActions?: QueryTableActions<RecordType>[];
  actions?: QueryTableActions<RecordType>[];
  formProps?: Omit<QueryFormProps<SearchValues>, 'fields' | 'initialValues' | 'showFieldsLength'>;
}

function BaseQueryTable<RecordType extends Record<string, any> = any, SeachValues = any>(
  props: QueryTableProps<RecordType>,
  ref: ForwardedRef<QueryTableInstance<RecordType>>
) {
  const prefix = usePrefix('querytable');
  const {
    fields,
    initialValues,
    showFieldsLength = 3,
    rowKey,
    columns,
    rowSelection,
    remoteDataSource,
    tableProps = {},
    formProps = {},
    leftActions,
    actions,
  } = props;

  const [form] = Form.useForm();
  const [, update] = useState({});

  const tableRef = useRef<TableInstance>(null);
  const modalRef = useRef<ModalFormInstance>(null);

  // ===== 刷新，用于更新action组件 =====
  const forceUpdate = () => {
    update({});
  };

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

  const getQueryTableInstance = () => ({
    form,
    table: tableRef.current!,
    modal: modalRef.current!,
  });

  useImperativeHandle(ref, getQueryTableInstance);

  // ===== 改写columns，render支持form和table实例，省略dataIndex配置 =====
  // TODO: 暂不支持children属性
  const renderColumns = (): ColumnType<RecordType>[] => {
    return columns.map((column) => {
      const finalRender = column.render
        ? ({ value, record, index }) => {
            return column.render!({ value, record, index, ...getQueryTableInstance() });
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
            return item.onClick(e, getQueryTableInstance());
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

  const finalRowSelection = rowSelection
    ? {
        ...(typeof rowSelection === 'boolean' ? {} : rowSelection),
        onChange: forceUpdate,
      }
    : undefined;

  return (
    <div className={prefix}>
      {!!showFieldsLength && (
        <QueryForm<SeachValues>
          form={form}
          fields={fields}
          onReset={onReset}
          onSubmit={onSubmit}
          {...formProps}
          showFieldsLength={showFieldsLength}
          initialValues={initialValues}
        />
      )}

      {renderActions()}

      <Table
        ref={tableRef}
        rowKey={rowKey}
        columns={renderColumns()}
        rowSelection={finalRowSelection}
        remoteDataSource={remoteDataSource}
        {...tableProps}
      />

      <ModalForm ref={modalRef} />
    </div>
  );
}

export const QueryTable = forwardRef<QueryTableInstance, QueryTableProps>(BaseQueryTable) as <
  RecordType extends Record<string, any> = any
>(
  props: PropsWithChildren<QueryTableProps<RecordType>> & { ref?: React.Ref<QueryTableInstance<RecordType>> }
) => ReactElement;
