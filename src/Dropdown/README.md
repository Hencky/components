---
title: DropdownButton
subGroup: 行为组件
---

# DropdownButton

解决文本显示问题：

1. 划入展示操作按钮

> 特点
> 1. 解决Popconfirm弹框出现时，下拉菜单消失问题
> 2. 按钮loading过程中，不会关闭下拉菜单，loading结束后自动收起下拉菜单

## demos

<Demo src="./demos/dropdownbutton.tsx" />

## API

```ts
export interface DropdownButtonProps extends Omit<DropDownProps, 'overlay' | 'visible' | 'onVisibleChange'> {
  actions: ButtonActionProps[];
}
```

基于antd的`Dropdown`封装，透传除`overlay` `visible` `onVisibleChange` 之外的属性，更多api请参考[Dropdown](https://ant.design/components/dropdown-cn/#API)。


| 字段名 |  说明 |类型 | 默认值 |
| :-----| :---- | :---- | :----: |
| actions | 必填，操作按钮渲染列表 | [ButtonActionProps](/components/Actions#actionbutton)[]，建议参考demo使用 | - |