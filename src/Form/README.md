---
title: Form
subGroup: 表单组件
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

## 组件说明

`Form`在`AForm`的基础上，扩展了`remoteValues`属性加载表单值。

## 组件示例

基础使用
<Demo src="./demos/remoteValues.tsx" />

## API

| 字段名       | 说明       | 类型                    | 默认值 |
| :----------- | :--------- | :---------------------- | :----: |
| remoteValues | 远程表单值 | `() => Promise<Values>` |   -    |

其他属性参考[Form](https://ant.design/components/form-cn/#API)。
