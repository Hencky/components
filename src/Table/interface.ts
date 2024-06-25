import type { ReactElement } from 'react';
import type { ColumnType as AColumnType } from 'antd/lib/table';
import type { Key } from 'antd/lib/table/interface';

/**
 * 额外的初始请求参数，注意：参数变化时，表格不会刷新
 * @default {}
 */
export type ExtraRequestParams = Record<string, any>;

/**
 * 排序配置
 */
export type SorterParams = {
  field: string;
  /** descend: 降序， ascend：升序 */
  order: 'descend' | 'ascend' | undefined;
};

/**
 * 过滤配置
 */
export type FilterParams = Record<string, any>;

/**
 * 分页配置
 */
export type Pagination = {
  /** 当前页 */
  current?: number;
  /** 分页大小 */
  size?: number;
  /** 总条数 */
  total: number;
};

export type BaseRequestParams = Pick<Pagination, 'current' | 'size'>;

export type RequestParams = BaseRequestParams &
  ExtraRequestParams &
  FilterParams & {
    sorter?: SorterParams;
  };

export type RequestResult<RecordType extends Record<string, any> = any> = {
  /** 数据源 **/
  records: RecordType[];
  /** 当前页 **/
  current: number;
  /** 数据总条数 **/
  total: number;
  /** 分页大小 **/
  size: number;
};

export interface TableInstance<RecordType = any> {
  /** 刷新表格 */
  refresh: (extraRefreshParams?: Record<string, any>) => Promise<void> | undefined;
  /** 重置表格到初始状态 */
  reset: (initialValues?: Record<string, any>) => void;
  /** 获取表格选中行数据 */
  getSelectedRowKeys: () => Key[];
  /** 设置表格选中行数据 */
  // setSelectedRowKeys: (rows: Key[]) => void;
  /** 获取表格选中行数据 */
  getSelectedRows: () => RecordType[];
  /** 设置表格选中行数据 */
  setSelectedRows: (rows: RecordType[]) => void;
  /** 获取数据源 */
  getDataSource: () => RecordType[];
  /** 设置数据源 */
  setDataSource: (dataSource: RecordType[]) => void;
  /** 获取分页配置 */
  getPagination: () => Pagination;
  /** 设置分页配置 */
  setPagination: (pagination: Pagination) => void;
  /** 获取表格loading状态 */
  getLoading: () => boolean;
  /** 设置表格loading状态 */
  setLoading: (loading: boolean) => void;
  /** 强制刷新表格 */
  forceUpdate: () => void;
}

export interface ColumnType<RecordType> extends Omit<AColumnType<RecordType>, 'render' | 'key'> {
  render?: (ctx: { value: RecordType; index: number; table: TableInstance; record: RecordType }) => ReactElement;
  key?: string;
  /** 列显示状态，为false时隐藏列 */
  visible?: boolean;
  children?: ColumnType<RecordType>[];
  tooltip?: string;
}
