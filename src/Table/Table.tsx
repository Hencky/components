import React, { useState, forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { ForwardedRef, ReactElement, PropsWithChildren } from 'react';
import { Table as ATable } from 'antd';
import type { TableProps as ATableProps } from 'antd/lib/table';
import type { Key, RowSelectionType, SorterResult, TableRowSelection } from 'antd/lib/table/interface';
import { FilterParams, Pagination, RequestParams, RequestResult, SorterParams } from './interface';
import { setRef } from '../_util';

const DEFAULT_PAGINATION = { size: 10, current: 1, total: 0 } as const;

export interface TableInstance<RecordType extends Record<string, any> = any> {
  /** 刷新表格 */
  refresh: (extraRefreshParams?: Record<string, any>) => void;
  /** 重置表格到初始状态 */
  reset: () => void;
  /** 获取表格选中行数据 */
  getSelectedRowKeys: () => Key[];
  /** 设置表格选中行数据 */
  setSelectedRowKeys: (rows: Key[]) => void;
  /** 获取表格选中行数据 */
  getSelectedRows: () => RecordType[];
  /** 设置表格选中行数据 */
  setSelectedRows: (rows: RecordType[]) => void;
  /** 获取数据源 */
  getDataSource: () => RecordType[];
  /** 设置数据源 */
  // setDataSource: (dataSource: RecordType[]) => void;
  /** 获取分页配置 */
  getPagination: () => Pagination;
  /** 设置分页配置 */
  // setPagination: (pagination: Pagination) => void;
  /** 获取表格loading状态 */
  getLoading: () => boolean;
  /** 设置表格loading状态 */
  setLoading: (loading: boolean) => void;
  /** 强制刷新表格 */
  forceUpdate: () => void;
}

export interface TableProps<RecordType extends Record<string, any> = any>
  extends Omit<ATableProps<RecordType>, 'dataSoruce' | 'loading' | 'rowSelection'> {
  /** 远程数据源 */
  remoteDataSource?: (params: RequestParams) => Promise<RequestResult<RecordType>>;
  /** 默认分页配置 */
  defaultPagination?: Pagination;
  /** 选中行配置 */
  rowSelection?: boolean | TableRowSelection<RecordType>;
  /** 初始是否发起一次请求，默认发起请求 */
  requestOnMount?: boolean;
}

function BasicTable<RecordType extends Record<string, any> = any>(
  props: PropsWithChildren<TableProps<RecordType>>,
  ref: ForwardedRef<TableInstance<RecordType>>
): ReactElement {
  const {
    rowKey = 'id',
    remoteDataSource,
    pagination,
    rowSelection,
    defaultPagination = DEFAULT_PAGINATION,
    requestOnMount,
    ...restTableProps
  } = props;
  const { onShowSizeChange, ...restPaginationProps } = pagination || {};

  const [loading, setLoading] = useState(false);
  const [dataSoruce, setDataSource] = useState<RecordType[]>([]);
  const [selectedRows, setSelectedRows] = useState<RecordType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [, forceUpdate] = useState({});

  const paginationRef = useRef<Pagination>(defaultPagination);
  const filterRef = useRef<FilterParams>(null);
  const sorterRef = useRef<SorterParams>(null);
  const isShowSizeChangeRef = useRef(false);

  // ===== 表格刷新 =====
  const refreshTable = (extraRefreshParams?: Record<string, any>) => {
    if (!remoteDataSource) return;
    const { current, size } = paginationRef.current;

    setLoading(true);
    return remoteDataSource({
      current,
      size,
      ...(filterRef.current || {}),
      ...(sorterRef.current === null ? {} : { sorter: sorterRef.current }),
      ...(extraRefreshParams || {}),
    })
      .then((data: RequestResult<RecordType>) => {
        const { records, current, size, total } = data || {};
        setRef(paginationRef, { current, size, total });
        setRef(filterRef, { ...filterRef.current, ...extraRefreshParams });
        setDataSource(records);
        setLoading(false);
      })
      .catch(() => {
        setDataSource([]);
        setLoading(false);
      });
  };

  // ===== 表格重置 =====
  const reset = () => {
    setRef(paginationRef, defaultPagination);
    setRef(filterRef, null);
    setRef(sorterRef, null);
    setSelectedRowKeys([]);
    setSelectedRows([]);
    refreshTable();
  };

  useImperativeHandle(ref, () => ({
    refresh: refreshTable,
    reset,
    getSelectedRows: () => selectedRows,
    setSelectedRows,
    getSelectedRowKeys: () => selectedRowKeys,
    setSelectedRowKeys,
    getDataSource: () => dataSoruce,
    // setDataSource,
    // setPagination: (pagination) => {
    //   setRef(paginationRef, pagination);
    //   forceUpdate({});
    // },
    getPagination: () => paginationRef.current,
    getLoading: () => loading,
    setLoading,
    forceUpdate: () => forceUpdate({}),
  }));

  useEffect(() => {
    if (requestOnMount === false) return;
    refreshTable();
  }, []);

  // ===== 表格变化 =====
  const onTableChange: ATableProps<RecordType>['onChange'] = (pagination, filters, sorter, datasource) => {
    const { current, pageSize, total } = pagination;
    const { field, order } = sorter as SorterResult<RecordType>;

    setRef(paginationRef, { current: isShowSizeChangeRef.current ? 1 : current, size: pageSize, total });
    setRef(sorterRef, field ? { field, order } : null);
    setRef(isShowSizeChangeRef, false);

    props.onChange?.(pagination, filters, sorter, datasource);

    refreshTable();
  };

  // ===== 选中行变化 =====
  const onRowSelectionChange = (currentSelectedRowKeys, currentSelectedRows) => {
    setSelectedRowKeys(currentSelectedRowKeys);
    setSelectedRows(currentSelectedRows);

    (rowSelection as TableRowSelection<RecordType>)?.onChange?.(currentSelectedRowKeys, currentSelectedRows);
  };

  // ===== pagination.size变化，调整current为1 =====
  const handleShowSizeChange = (current, size) => {
    setRef(isShowSizeChangeRef, true);
    onShowSizeChange?.(current, size);
  };

  const internalRowSelection = {
    ...(typeof rowSelection === 'boolean' ? {} : rowSelection),
    selectedRowKeys,
    onChange: onRowSelectionChange,
  };

  return (
    <ATable<RecordType>
      bordered
      rowKey={rowKey}
      {...restTableProps}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        ...pagination,
        ...restPaginationProps,
        current: paginationRef.current.current,
        total: paginationRef.current.total,
        onShowSizeChange: handleShowSizeChange,
      }}
      rowSelection={rowSelection ? internalRowSelection : undefined}
      onChange={onTableChange}
      loading={loading}
      dataSource={dataSoruce}
    />
  );
}

const Table = forwardRef(BasicTable);

export { Table };
