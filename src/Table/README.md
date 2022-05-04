---
title: Table
subGroup: 展示组件
---

# Table

1. 后端分页表格，`loading` `rowSelection` `pagination`由`Table`组件内部控制。
2. 支持`remoteDataSource`方法，该方法接收`Table`组件需要数据格式的 Promise 对象，即可对`dataSource`进行控制。
3. 支持实例方法，灵活控制表格。

## table Demo

<Demo src="./demos/demo1.tsx" />

## Table 后端分页格式

下发参数

```ts
interface RequestParams {
  /** 当前页 */
  current: number;
  /** 分页大小 */
  size: number;
  /** 排序参数 */
  sorter?: {
    /** 排序字段 */
    field: string;
    /** descend: 降序， ascend：升序 */
    order: 'descend' | 'ascend' | undefined;
  };
  /** 其他分页参数 */
  [key: string]: any;
}
```

数据响应

```ts
type RequestResult<RecordType extends Record<string, any> = any> = {
  /** 数据源 **/
  records: RecordType[];
  /** 当前页 **/
  current: number;
  /** 数据总条数 **/
  total: number;
  /** 分页大小 **/
  size: number;
};
```

## Table 实例方法

```ts
import type { Key } from 'antd/lib/table/interface';

export type Pagination = {
  /** 当前页 */
  current: number;
  /** 分页大小 */
  size: number;
  /** 总条数 */
  total: number;
};

export interface TableInstance<RecordType = any> {
  /** 刷新表格 */
  refresh: (extraRefreshParams?: Record<string, any>) => Promise<void> | undefined;
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
```

## Table API

```ts
export interface TableProps<RecordType = any>
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
```
