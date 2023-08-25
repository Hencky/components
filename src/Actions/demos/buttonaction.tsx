/**
 * @title ButtonAction
 * @description 按钮
 */

import React from 'react';
import { message, Space } from 'antd';
import { ButtonAction } from 'lucky-bird-ui';

const ButtonActionDemo = () => {
  return (
    <Space>
      <ButtonAction
        {...{
          children: '新增',
          type: 'primary',
          onClick: () => {
            console.log('Action 1');
          },
        }}
      />
      <ButtonAction
        {...{
          disabled: true,
          children: '新增',
          tooltip: '设置disabled被禁用了~',
          onClick: () => {
            console.log('Action 1');
          },
        }}
      />
      <ButtonAction
        {...{
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
        }}
      />
      <ButtonAction
        {...{
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
        }}
      />
    </Space>
  );
};

export default ButtonActionDemo;
