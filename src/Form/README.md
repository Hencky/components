---
title: Form
subGroup: 录入组件
---

# Form

> 理想的表单是配置化方案实现，加上健全的录入组件，解决并规范输入场景的任何问题。
>
> 因为理想化的方案需要较长时间经历，先实现一个简单版。
>
> **欢迎参与，一起共建**，理想状态 TODO：
>
> 基础能力： 配置表单、配置表格、原子控件、数据录入组件  
> 模板能力： 表单配置页、搜索表格  
> 高阶能力： 快速搭建平台

## FormItem

FormItem 是在`Form.Item`组件基础上增加`Col`组件包裹，方便布局。

> 如果不设置`span`属性的话，不会生成`Col`组件包裹。

### FormItem demos

<Demo src="./demos/formitemdemo.tsx" />

### FormItemApi

| 字段名       | 说明                                   | 类型                                 |  默认值  |
| :----------- | :------------------------------------- | :----------------------------------- | :------: | ------ |
| render       | 是否渲染                               | `((props: FormItemProps) => boolean) | boolean` | `true` |
| colStyle     | Col 样式                               | `React.CSSProperties`                |    -     |
| colClassName | colClassName                           | `string`                             |    -     |
| children     | 必填，antd 表单录入组件，如`<Input />` | `React.ReactElement`                 |    -     |

除此以外，透传[Col](https://ant.design/components/grid-cn/#Col)的`span` `offset` `push` `pull` `order` `flex` 属性。  
以及，[Form.Item](https://ant.design/components/form-cn/#Form.Item)的属性。
