import React from 'react';
import { DropdownButton } from '@pms/ui';
import { Button, message, ConfigProvider } from 'antd';
import type { DropdownButtonProps } from '@pms/ui';
import zhCN from 'antd/lib/locale/zh_CN';

const actions: DropdownButtonProps['actions'] = [
  {
    children: '新增',
    type: 'text',
    block: true,
    onClick: () => {
      message.success('新增');
    },
  },
  {
    children: '编辑',
    block: true,
    type: 'text',
    onClick: () => {
      console.log('Action 编辑');
      return new Promise((resolve) => {
        setTimeout(() => {
          message.success('编辑成功');
          resolve(true);
        }, 2000);
      });
    },
  },
  {
    children: '删除',
    block: true,
    danger: true,
    type: 'text',
    confirm: '确认删除?',
    onClick: (e) => {
      console.log('Action 删除', e);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          message.error('删除失败');
          reject(true);
        }, 2000);
      });
    },
  },
];

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <DropdownButton actions={actions}>
        <Button type="primary">划入展开菜单</Button>
      </DropdownButton>
    </ConfigProvider>
  );
};
