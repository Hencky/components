/**
 * @title ButtonActions
 * @description 按钮
 */

import React from 'react';
import { ConfigProvider, message } from 'antd';
import { ButtonActions } from 'lucky-bird-ui';
import type { ButtonActionsProps } from 'lucky-bird-ui';
import zhCH from 'antd/lib/locale/zh_CN';

const ButtonAction = () => {
  const buttonActions: ButtonActionsProps['actions'] = [
    {
      children: '新增',
      type: 'primary',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      disabled: true,
      children: '新增',
      tooltip: '设置disabled被禁用了~',
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
      danger: true,
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

  return (
    <ConfigProvider locale={zhCH}>
      <ButtonActions actions={buttonActions} />
    </ConfigProvider>
  );
};

export default ButtonAction;
