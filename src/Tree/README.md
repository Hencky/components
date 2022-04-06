---
title: Tree
subGroup: 展示组件
---

# Tree

可搜索树形组件

## demos

- 一般使用

<Demo src="./demos/tree1.tsx" />


- 新增按钮 和 划入展开的渲染按钮

<Demo src="./demos/tree2.tsx" />



## API

基于antd的`Tree`封装，更多api请参考[Tree](https://ant.design/components/tree-cn/#API)。

| 字段名 |  说明 |类型 | 默认值 |
| :-----| :---- | :---- | :----: |
| searchProps |  搜索框属性 | [SearchProps](https://ant.design/components/input-cn/#Input.Search) | `{}` |
| showSearch | 是否显示搜索框 | `boolean` | `true` |
| showOperatorOnHover | 鼠标划入时才显示操作按钮 | `boolean`|  `true` |
| operatorRender | 操作按钮渲染 | `(data: DataNode) => React.ReactElement`|  - |
| extraRender | 搜索框右侧渲染额外组件，例如添加按钮 | `() => React.ReactElement` |  - |