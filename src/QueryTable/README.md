---
title: QueryTable
subGroup: 展示组件
---

# QueryTable

## 组件介绍

- 查询表格解决方案
- 内置 ModalForm，优化弹框处理

## demos

基础使用
<Demo src="./demos/base.tsx">

行选择
<Demo src="./demos/rowselection.tsx">

使用 tableProps 传递更多属性
<Demo src="./demos/tableprops.tsx">

## 实例方法

```ts
interface QueryTableInstance<RecordType = any, Values = any> {
  form: FormInstance<Values>;
  table: TableInstance<RecordType>;
  modal: ModalFormInstance;
}
```

## API

```ts
type QueryTableContext<RecordType = any> = QueryTableInstance<RecordType>;

type OutsideTableType = 'remoteDataSource' | 'columns' | 'rowKey' | 'rowSelection';

interface QueryTableActions<RecordType = any> extends Omit<ButtonActionProps, 'onClick'> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>, ctx: QueryTableContext<RecordType>) => void;
}

type QueryTableColumnRenderContext<RecordType = any> = {
  value: RecordType;
  index: number;
  record: RecordType;
} & QueryTableContext<RecordType>;

interface QueryTableColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'render'> {
  render?: (ctx: QueryTableColumnRenderContext) => ReactElement;
}

interface QueryTableProps<RecordType extends Record<string, any> = any, SearchValues = any>
  extends Pick<QueryFormProps<SearchValues>, 'fields' | 'initialValues' | 'showFieldsLength'>,
    Pick<TableProps, Exclude<OutsideTableType, 'columns'>> {
  columns: QueryTableColumnType<RecordType>[];
  tableProps?: Omit<TableProps<RecordType>, OutsideTableType>;
  leftActions?: QueryTableActions<RecordType>[];
  actions?: QueryTableActions<RecordType>[];
  formProps?: Omit<QueryFormProps<SearchValues>, 'fields' | 'initialValues' | 'showFieldsLength'>;
}
```
