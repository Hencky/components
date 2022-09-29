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
