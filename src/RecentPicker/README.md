---
title: RecentPicker
subGroup: 录入组件
---

# RecentPicker

近期时间选择组件

## demos

<Demo src="./demos/recentpicker.tsx" />

## demos2

> 不成熟的设计方案，不推荐使用。建议在日期展开框下面增加按钮，解决此类场景问题。参考[demo](https://codesandbox.io/s/ced29l)

<Demo src="./demos/recentpicker2.tsx" />

## API

```ts
import type { Moment } from 'moment';
import type { RangePickerProps } from 'antd/lib/date-picker';

export type RangeValue = [Moment, Moment];

export type RecentPickerValue<T> = T | RangeValue;

export interface RecentPickerProps<T extends { label: string; value: any }> {
  onChange?: (value: RecentPickerValue<T['value']>) => void;
  value?: RecentPickerValue<T['value']>;
  defaultValue?: RangeValue;
  options?: T[];
  rangePickerProps?: RangePickerProps;
  showRangePicker?: boolean;
}
```

| 字段名           | 说明                                          | 类型                                                                                              | 默认值 |
| :--------------- | :-------------------------------------------- | :------------------------------------------------------------------------------------------------ | :----: |
| onChange         | 值变化时的回调                                | `(value: RecentPickerValue<T['value']>) => void`                                                  |   -    |
| value            | 值                                            | moment 或`option string`，建议参考 demo                                                           |   -    |
| defaultValue     | 切换到自定义选择时的值                        | `RangeValue`                                                                                      |   -    |
| options          | 日期范围选择数据源                            | `T extends { label: string; value: any }[]`                                                       |   -    |
| rangePickerProps | 日期范围选择其他参数，透传给`RangePicker`组件 | [RangePickerProps](https://ant.design/components/date-picker-cn/#%E5%85%B1%E5%90%8C%E7%9A%84-API) |   -    |
