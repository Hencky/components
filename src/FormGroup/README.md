---
title: FormGroup
subGroup: 表单组件
---

# FormGroup

## 组件介绍

1. `FormGroup`提供`FormItem`批量使用能力。
2. `FormGroup`的`colon`、`labelCol`、`labelAlign`、`wrapperCol`、`hidden`、`disabled`属性会传给每个子`FormItem`组件。

## demos

基础使用
<Demo src="./demos/base.tsx" />

配合容器使用
<Demo src="./demos/container.tsx" />

### API

| 字段名 | 说明             | 类型                                              | 默认值 |
| :----- | :--------------- | :------------------------------------------------ | :----: |
| fields | 必填，表单项列表 | `FormItemProps[]`                                 |   -    |
| render | 是否渲染         | `(props: FormGroupProps) => boolean` \| `boolean` | `true` |

除此以外，透传[Row](https://ant.design/components/grid-cn/#Row)的属性。  
以及，[Form.Item](https://ant.design/components/form-cn/#Form.Item)的`colon` `labelCol` `labelAlign` `wrapperCol` `hidden`、`disabled`属性，这些属性会透传到每个`FormItem`组件上。
