---
title: FormItem
subGroup: 表单组件
---

<!-- 配置只支持README.md文件暂时先开一个文件夹处理好了 -->

# FormItem

## 组件介绍

**`FormItem`和`AForm.Item`有以下区别**：

1. 为方便表单布局，`FormItem`在`AForm.Item`组件基础上增加`Col`组件包裹。如果设置`span={null}`的话，不会生成`Col`组件容器。

2. `FormItem` 扩展了**数据源**的使用，支持`dataSource`和`remoteDataSource`方法传递数据源给子组件。

3. `FormItem` 的`disabled`属性也会传递给子组件。

> TODO: 暂时不考虑对数据源、disabled 等状态的实例方法扩展。

## demos

基本使用
<Demo src="./demos/base.tsx" />

配合 span 布局
<Demo src="./demos/layout.tsx" />

表单关联: 常规使用
<Demo src="./demos/dependencybase.tsx" />

表单关联: 被动表单关联
<Demo src="./demos/dependency.tsx" />

表单关联: 被动表单关联 1
<Demo src="./demos/deps.tsx" />

### API

| 字段名           | 说明                                                  | 类型                                             | 默认值  |
| :--------------- | :---------------------------------------------------- | :----------------------------------------------- | :-----: |
| colClassName     | col 的 className 属性                                 | `string`                                         |    -    |
| colStyle         | Col 样式                                              | `React.CSSProperties`                            |    -    |
| dataSource       | 数据源                                                | `any`                                            |    -    |
| disabled         | 是否禁用表单项，`disabled`会传给子组件                | `boolean` \| `() => boolean`                     | `false` |
| remoteDataSource | 远程数据源                                            | `() => Promise<any>` \| `boolean`                |    -    |
| render           | 是否渲染                                              | `(props: FormItemProps) => boolean` \| `boolean` | `true`  |
| span             | `FormItem`占据的栅格数量，传`null`时没有`Col`组件包裹 | `ColProps['span']` \| `null`                     |  `24`   |

除此以外，透传[Col](https://ant.design/components/grid-cn/#Col)的 `offset` `push` `pull` `order` `flex` 属性。  
以及，[Form.Item](https://ant.design/components/form-cn/#Form.Item)的其他属性。
