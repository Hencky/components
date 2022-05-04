---
title: QueryTable
subGroup: 展示组件
---

# QueryTable

- 查询表格解决方案

## QueryTable Demo

<Demo src="./demos/demo1.tsx">

## QueryTable 实例方法

```ts
export interface QueryTableInstance<RecordType = any> {
  form: FormInstance;
  table: TableInstance<RecordType>;
}
```

## QueryTable API

```ts
export interface QueryTableActions extends Omit<ButtonActionProps, 'onClick'> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>, ctx: { form: FormInstance; table: TableInstance }) => void;
}

export interface QueryTableColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'render'> {
  render?: (ctx: {
    value: RecordType;
    index: number;
    form: FormInstance;
    table: TableInstance;
    record: RecordType;
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
```
