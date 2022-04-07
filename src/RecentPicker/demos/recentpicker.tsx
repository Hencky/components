import React from 'react';
import { Card, Divider } from 'antd';
import moment from 'moment';
import { RecentPicker } from '@pms/ui';

export default () => {
  return (
    <Card>
      <div>一般使用：</div>

      <RecentPicker
        options={[
          { label: '本周', value: 'week' },
          { label: '本月', value: 'month' },
          { label: '今年', value: 'year' },
        ]}
        onChange={(val) => {
          console.log('val', val);
        }}
      />

      <Divider />

      <div>切换到自定义默认显示当前月：</div>
      <RecentPicker
        options={[
          { label: '本周', value: 'week' },
          { label: '本月', value: 'month' },
          { label: '今年', value: 'year' },
        ]}
        onChange={(val) => {
          console.log('val', val);
        }}
        defaultValue={[moment().subtract(1, 'months'), moment()]}
      />

      <Divider />

      <div>回显：</div>
      <RecentPicker
        options={[
          { label: '本周', value: 'week' },
          { label: '本月', value: 'month' },
          { label: '今年', value: 'year' },
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
        options={[
          { label: '本周', value: 'week' },
          { label: '本月', value: 'month' },
          { label: '今年', value: 'year' },
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
