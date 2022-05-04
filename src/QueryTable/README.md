---
title: QueryTable
subGroup: 展示组件
---

# QueryTable

- 查询表格解决方案

## QueryTable API

```ts
export interface QueryTableProps<RecordType extends Record<string, any> = any>
  extends Omit<QueryFormProps, 'onSubmit' | 'onReset' | 'form'>,
    Pick<TableProps, OutsideTableType> {
  tableProps?: Omit<TableProps<RecordType>, OutsideTableType>;
  leftActions?: QueryTableActions[];
  actions?: QueryTableActions[];
}
```
