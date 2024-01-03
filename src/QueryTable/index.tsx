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
import cls from 'classnames';
import { usePrefix } from '../_hooks';
import { ConfigProvider } from '../ConfigProvider';
import { QueryForm, type QueryFormProps } from '../QueryForm';
import { ModalForm, type ModalFormInstance } from '../ModalForm';
import { OperatorActions, type QueryTableActionType } from './OperatorActions';
import { Table, type TableProps, type TableInstance, type ColumnType } from '../Table';
import { type QueryTableInstance } from './interface';

import './index.less';

export * from './OperatorActions';
export * from './interface';

export type QueryTableContext<RecordType = any> = QueryTableInstance<RecordType>;

export type OutsideTableType = 'remoteDataSource' | 'columns' | 'rowKey' | 'rowSelection';

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
  leftActions?: QueryTableActionType[];
  actions?: QueryTableActionType[];
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
            return column.render!({
              value,
              record,
              index,
              ...getQueryTableInstance(),
            });
          }
        : undefined;
      return {
        ...column,
        render: finalRender,
      };
    });
  };

  // ===== 操作按钮渲染，改写onClick，支持form和table实例 =====
  // TODO: TS中未体现
  const renderActions = () => {
    return (
      <div
        className={cls({
          [prefix + '-actions']: true,
          [prefix + '-actions-empty']: !leftActions && !actions,
        })}
      >
        <div>
          <OperatorActions actions={leftActions} getCtx={getQueryTableInstance} />
        </div>
        <div>
          <OperatorActions actions={actions} getCtx={getQueryTableInstance} />
        </div>
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
    <ConfigProvider>
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

        {/* @ts-expect-error */}
        <ModalForm ref={modalRef} />
      </div>
    </ConfigProvider>
  );
}

export const QueryTable = forwardRef<QueryTableInstance, QueryTableProps>(BaseQueryTable) as <
  RecordType extends Record<string, any> = any
>(
  props: PropsWithChildren<QueryTableProps<RecordType>> & {
    ref?: React.Ref<QueryTableInstance<RecordType>>;
  }
) => ReactElement;
