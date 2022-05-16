---
title: Text
subGroup: 展示组件
---

# Text

## 组件介绍

解决文本显示问题：

1. 超出隐藏，鼠标划入展示文本
2. ui 标准配色： 标题色，文本颜色，次要文本颜色，主题色

## demos

<Demo src="./demos/demo1.tsx" />

## API

基于 antd 的`Typography`封装，更多 api 请参考[Typography.Paragraph](https://ant.design/components/typography-cn/#Typography.Paragraph)。

| 字段名   | 说明                             | 类型                                                                     | 默认值 |
| :------- | :------------------------------- | :----------------------------------------------------------------------- | :----: |
| type     | 类型                             | `'description'` `'title'` `'text'` `'primary'` `AParagraphProps['type']` | `text` |
| rows     | 文本行数，超出设置行数显示省略号 | `number`                                                                 |   1    |
| children | 文本内容                         | `string`                                                                 |   -    |
