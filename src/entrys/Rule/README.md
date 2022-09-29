---
title: Rule
subGroup: 数据录入组件
---

# Rule

## 组件介绍

1. 规则组件

## demos

基础使用
<Demo src="./demos/base.tsx" />

<!-- 值格式 -->

```ts
const condition = {
  type: 'or',
  children: [
    {
      type: 'and',
      children: [
        {
          variable: 'a',
          operator: '=',
          value: '123',
        },
        {
          variable: 'a',
          operator: '=',
          value: '123',
        },
        {
          type: 'or',
          children: [],
        },
      ],
    },
    {
      type: 'or',
      children: [
        {
          variable: 'a',
          operator: '=',
          value: '123',
        },
        {
          variable: 'a',
          operator: '=',
          value: '123',
        },
      ],
    },
  ],
};
```
