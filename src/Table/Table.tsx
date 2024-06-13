import React, { useState, forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import type { ForwardedRef, ReactElement, PropsWithChildren } from 'react';
import cls from 'classnames';
import { Table as ATable } from 'antd';
import type { TableProps as ATableProps } from 'antd/lib/table';
import type { Key, SorterResult, TableRowSelection } from 'antd/lib/table/interface';
import type {
  FilterParams,
  Pagination,
  RequestParams,
  RequestResult,
  SorterParams,
  ColumnType,
  TableInstance,
} from './interface';
import { usePrefix } from '../_hooks';
import { setRef, renderColumns } from '../_util';

import './table.less';

const DEFAULT_PAGINATION = { size: 10, current: 1, total: 0 } as const;

export interface TableProps<RecordType extends Record<string, any> = any>
  extends Omit<ATableProps<RecordType>, 'dataSource' | 'loading' | 'rowSelection' | 'columns'> {
  /** 远程数据源 */
  remoteDataSource?: (params: RequestParams) => Promise<RequestResult<RecordType>>;
  /** 默认分页配置 */
  defaultPagination?: Pagination;
  /** 选中行配置 */
  rowSelection?: true | TableRowSelection<RecordType>;
  /** 初始是否发起一次请求，默认发起请求 */
  requestOnMount?: boolean;
  /** 列配置 */
  columns?: ColumnType<RecordType>[];
}

function BasicTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<TableProps<RecordType>>,
  ref: ForwardedRef<TableInstance<RecordType>>
): ReactElement {
  const {
    rowKey = 'id',
    columns = [],
    className,
    remoteDataSource,
    pagination,
    rowSelection,
    defaultPagination = DEFAULT_PAGINATION,
    requestOnMount,
    ...restTableProps
  } = props;

  const prefix = usePrefix('base-table');

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const [, forceUpdate] = useState({});

  const paginationRef = useRef<Pagination>(defaultPagination);
  const filterRef = useRef<FilterParams>(null);
  const sorterRef = useRef<SorterParams>(null);
  const selectedRowsRef = useRef<RecordType[]>([]);
  const selectedRowKeysRef = useRef<Key[]>([]);
  const isShowSizeChangeRef = useRef(false);

  const noPagination = pagination === false;

  // ===== 表格刷新 =====
  const refreshTable = (extraRefreshParams?: Record<string, any>): Promise<void> | undefined => {
    if (!remoteDataSource) return;
    const { current, size } = paginationRef.current;

    setLoading(true);
    return remoteDataSource({
      ...(noPagination ? {} : { current, size }),
      ...(filterRef.current || {}),
      ...(sorterRef.current === null ? {} : { sorter: sorterRef.current }),
      ...(extraRefreshParams || {}),
    })
      .then((data: RequestResult<RecordType>) => {
        if (noPagination) {
          setDataSource(data as unknown as RecordType[]);
          return;
        }

        const { records, current, size, total } = data || {};
        setRef(paginationRef, { current, size, total });
        setRef(filterRef, { ...filterRef.current, ...extraRefreshParams });
        setDataSource(records);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        setDataSource([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ===== 表格重置 =====
  const reset = () => {
    setRef(paginationRef, defaultPagination);
    setRef(filterRef, null);
    setRef(sorterRef, null);
    setRef(selectedRowsRef, []);
    setRef(selectedRowKeysRef, []);
    refreshTable();
  };

  // ===== 表格实例 =====
  const getTableInstance = () => ({
    refresh: refreshTable,
    reset,
    getSelectedRows: () => selectedRowsRef.current,
    setSelectedRows: (selectedRows) => {
      setRef(selectedRowsRef, selectedRows);
      const selectedRowKeys = selectedRows.map((record) => record[rowKey as string]);
      setRef(selectedRowKeysRef, selectedRowKeys);
    },
    getSelectedRowKeys: () => selectedRowKeysRef.current,
    getDataSource: () => dataSource,
    setDataSource,
    setPagination: (pagination) => {
      setRef(paginationRef, pagination);
      forceUpdate({});
    },
    getPagination: () => paginationRef.current,
    getLoading: () => loading,
    setLoading,
    forceUpdate: () => forceUpdate({}),
  });

  useImperativeHandle(ref, getTableInstance, [
    refreshTable,
    dataSource,
    selectedRowsRef.current,
    selectedRowKeysRef.current,
    loading,
  ]);

  useEffect(() => {
    if (requestOnMount === false) return;
    refreshTable();
  }, []);

  // ===== 表格变化 =====
  const onTableChange: ATableProps<RecordType>['onChange'] = (pagination, filters, sorter, ...args) => {
    const { current, pageSize, total } = pagination;
    const { field, order } = sorter as SorterResult<RecordType>;
    setRef(paginationRef, { current: isShowSizeChangeRef.current ? 1 : current!, size: pageSize!, total: total! });
    setRef(sorterRef, field ? { field, order } : null);
    setRef(isShowSizeChangeRef, false);

    props.onChange?.(pagination, filters, sorter, ...args);

    refreshTable();
  };

  // ===== 选中行变化 =====
  const onRowSelectionChange = (currentSelectedRowKeys, currentSelectedRows, info) => {
    setRef(selectedRowsRef, currentSelectedRows);
    setRef(selectedRowKeysRef, currentSelectedRowKeys);
    (rowSelection as TableRowSelection<RecordType>)?.onChange?.(currentSelectedRowKeys, currentSelectedRows, info);
  };

  // ===== pagination.size变化，调整current为1 =====
  const { onShowSizeChange, ...restPaginationProps } = pagination || {};

  const handleShowSizeChange = (current, size) => {
    setRef(isShowSizeChangeRef, true);
    onShowSizeChange?.(current, size);
  };

  const internalRowSelection = {
    ...(typeof rowSelection === 'boolean' ? {} : rowSelection),
    selectedRowKeys: selectedRowKeysRef.current,
    onChange: onRowSelectionChange,
  };

  return (
    <ATable<RecordType>
      className={cls(prefix, className)}
      bordered={false}
      rowKey={rowKey}
      // ===== 改写columns，render支持form和table实例，省略dataIndex配置 =====
      columns={renderColumns(columns, { table: getTableInstance() })}
      {...restTableProps}
      pagination={
        noPagination
          ? false
          : {
              showQuickJumper: true,
              showSizeChanger: true,
              ...pagination,
              ...restPaginationProps,
              current: paginationRef.current.current,
              total: paginationRef.current.total,
              onShowSizeChange: handleShowSizeChange,
              showTotal(total) {
                return `共 ${total} 条`;
              },
            }
      }
      rowSelection={rowSelection ? internalRowSelection : undefined}
      onChange={onTableChange}
      loading={loading}
      dataSource={dataSource}
    />
  );
}

export const Table = forwardRef<TableInstance, TableProps>(BasicTable) as <
  RecordType extends Record<string, any> = any
>(
  props: PropsWithChildren<TableProps<RecordType>> & { ref?: React.Ref<TableInstance<RecordType>> }
) => ReactElement;
