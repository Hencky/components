/**
 * @title TextActions
 * @description 文本按钮
 */

import React from 'react';
import { ConfigProvider, message } from 'antd';
import { TextActions } from '@pms/ui';
import type { TextActionsProps } from '@pms/ui';
import zhCH from 'antd/lib/locale/zh_CN';

export default () => {
  const textActions: TextActionsProps['actions'] = [
    {
      render: false,
      children: '新增',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      disabled: true,
      children: '新增',
      tooltip: '前面还有一个没渲染的按钮呀~',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      children: '编辑',
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
      confirm: '确认删除?',
      onClick: (e) => {
        console.log('Action 删除', e);
        return new Promise((resolve) => {
          setTimeout(() => {
            message.success('删除成功');
            resolve(true);
          }, 2000);
        });
      },
    },
    {
      children: '删除',
      confirm: '确认删除?',
      type: 'danger',
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

  return (
    <ConfigProvider locale={zhCH}>
      <TextActions actions={textActions} />
    </ConfigProvider>
  );
};
