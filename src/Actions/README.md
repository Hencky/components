---
title: Actions
subGroup: 行为组件
---

# Actions

交互按钮解决方案：

1. 图标、文本、按钮
2. 内置loading、disabled状态，Tooltip 和 Popconfirm 
3. 一般用于表格操作栏等需要`onClick`事件交互的地方

## demos

<Demo src="./demos/buttonaction.tsx" />


## demos

<Demo src="./demos/iconaction.tsx" />

## demos

<Demo src="./demos/textaction.tsx" />


## API

### 公共API

> 建议参考demo使用。
#### 单个Action组件

| 字段名 | 说明 | 类型 | 默认值 |
| :-----| :---- | :---- | :----: |
| tooltip |  气泡提示文本 |推荐 `string`，`ReactNode 或 () => ReactNode`  | - |
| confirm | 二次确认提示文本 | 推荐 `string`，`ReactNode 或 () => ReactNode` | - |
| disabled | 是否禁用 |   `() => boolean 或 boolean` | false |
| render | 是否渲染 |   `() => boolean 或 boolean` | true |
| container |  包裹容器  | `() => React.ReactElement 或 React.ReactElement` | - |
| onClick | 必填，点击事件 |  `(...args: any[]) => any`  | - |




#### Actions组， 更多属性参考[Space](https://ant.design/components/space-cn/)

| 字段名 | 说明 | 类型 | 默认值 |
| :-----| :---- | :---- | :----: |
| actions |  必填，(`对应类型组件` 或者`React.ReactElement` )[] |   | - |

### ActionButton

同antd的[Button](https://ant.design/components/button-cn/#API)。

### ActionText

同[Text](/components/Text#api)。


### ActionIcon

图标参考[Icon](https://ant.design/components/icon-cn)。

| 字段名 | 说明 | 类型 | 默认值 |
| :-----| :---- | :---- | :----: |
| icon |  必填，图标 | `@ant-design/icons`组件 | - |
| type |  按钮类型 | `'primary'` `'error'` `'success'` `'warning'`  | - |
| disabled | 是否禁用 |   `() => boolean 或 boolean` | false |