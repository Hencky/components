---
title: DatePicker
subGroup: 录入组件
---

# DatePicker

## 组件说明

日期选择组件，默认获取到的值为日期字符串（datestring）格式，支持获取`utc`格式的值。

## demos

<Demo src="./demos/datepicker.tsx" />

## API

```ts
export type DatePickerProps = Omit<ADatePickerProps, 'value'> & {
  /** 根据format格式化值处理，默认true，可设置为utc获取时间戳格式值 */
  valueFormat?: 'utc' | boolean;
  value?: number | string | Moment;
  /** 根据showTime区分TimePicker，ADatePickerProps里没有这个类型 */
  showTime?: boolean;
};
```
