---
title: QueryForm
subGroup: 录入组件
---

# QueryForm

- 搜索表单解决方案
- 单搜索：不显示 label，只有查询按钮
- 单行搜索：显示查询、重置按钮
- 多行搜索：超出行折叠

## QueryForm Demo

单搜索
<Demo src="./demos/single.tsx" />

单行搜索
<Demo src="./demos/singleRow.tsx" />

多行搜索
<Demo src="./demos/queryform.tsx" />

## QueryForm API

```ts
import type { FormInstance, FormProps } from 'antd/lib/form';

export interface QueryFormProps extends Omit<FormProps, 'fields'> {
  /** 表单搜索字段配置，同FormItem */
  fields: FormItemProps[];
  /** 表单实例 */
  form?: FormInstance;
  /** 显示字段长度，2/3/4 默认3 */
  showFieldsLength?: number;
  /** 默认展开，默认false */
  defaultExpand?: boolean;
  /** 点击查询时的回调函数 */
  onSubmit: (values: any) => Promise<void> | undefined;
  /** 点击重置时的回调函数 */
  onReset?: () => void;
  /** 是否显示分割线， 默认true */
  showDivider?: boolean;
}
```
