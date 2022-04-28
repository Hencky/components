import React from 'react';
import { Card, Divider } from 'antd';
import moment from 'moment';
import { RecentPicker } from '@pms/ui';
import type { Moment } from 'moment';
// @ts-ignore
import type { RangeValue } from 'rc-picker/lib/interface';
import { RecentPickerValue } from '@pms/ui';

const Demo = () => {
  return (
    <Card>
      <div>一般使用：</div>

      <RecentPicker<{ label: string; value: moment.unitOfTime.StartOf }>
        showRangePicker
        options={[
          { label: '本周', value: 'week' },
          { label: '本月', value: 'month' },
          { label: '今年', value: 'year' },
        ]}
        onChange={(val) => {
          let finalValue: RecentPickerValue<moment.unitOfTime.StartOf> = val;
          if (typeof val === 'string') {
            finalValue = [moment().startOf(val as any), moment()];
          }
          const result = (finalValue as RangeValue<Moment>)?.map((val) => val?.format('YYYY-MM-DD HH:mm:ss'));
          console.log('val', result);
        }}
      />

      <Divider />

      <div>切换到自定义默认显示当前月：</div>
      <RecentPicker
        showRangePicker
        options={[
          { label: '近一周', value: 'week' },
          { label: '近一月', value: 'month' },
          { label: '近一年', value: 'year' },
        ]}
        onChange={(val) => {
          console.log('val', val);
        }}
        defaultValue={[moment().subtract(1, 'months'), moment()]}
      />

      <Divider />

      <div>回显：</div>
      <RecentPicker
        showRangePicker
        options={[
          { label: '近一周', value: 'week' },
          { label: '近一月', value: 'month' },
          { label: '近一年', value: 'year' },
        ]}
        value={'month'}
        onChange={(val) => {
          console.log('val', val);
        }}
        defaultValue={[moment().subtract(1, 'months'), moment()]}
      />

      <Divider />

      <div>回显：</div>
      <RecentPicker
        showRangePicker
        options={[
          { label: '近一周', value: 'week' },
          { label: '近一月', value: 'month' },
          { label: '近一年', value: 'year' },
        ]}
        value={[moment().subtract(2, 'months'), moment().subtract(1, 'weeks')]}
        onChange={(val) => {
          console.log('val', val);
        }}
        defaultValue={[moment().subtract(1, 'months'), moment()]}
      />
    </Card>
  );
};

export default Demo;
