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
