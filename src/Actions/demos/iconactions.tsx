/**
 * @title TextActions
 * @description 按钮
 */

import React from 'react';
import { ConfigProvider, message, Row } from 'antd';
import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IconActions } from 'lucky-bird-ui';
import type { IconActionsProps } from 'lucky-bird-ui';
import zhCH from 'antd/lib/locale/zh_CN';

const IconActionDemo = () => {
  const iconActions: IconActionsProps['actions'] = [
    {
      icon: EditOutlined,
      tooltip: '编辑',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      icon: CopyOutlined,
      tooltip: '复制~',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      icon: EditOutlined,
      tooltip: '编辑',
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
      icon: DeleteOutlined,
      tooltip: '删除',
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
      icon: DeleteOutlined,
      confirm: '确认删除?',
      type: 'error',
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

  const iconTextActions: IconActionsProps['actions'] = [
    {
      icon: EditOutlined,
      text: '编辑',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      icon: CopyOutlined,
      text: '复制~',
      onClick: () => {
        console.log('Action 1');
      },
    },
    {
      icon: EditOutlined,
      text: '编辑',
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
      icon: DeleteOutlined,
      text: '删除',
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
      icon: DeleteOutlined,
      confirm: '确认删除?',
      type: 'error',
      text: '删除',
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
      <Row>
        <IconActions actions={iconActions} />
      </Row>
      <Row>
        <IconActions actions={iconTextActions} />
      </Row>
    </ConfigProvider>
  );
};

export default IconActionDemo;
