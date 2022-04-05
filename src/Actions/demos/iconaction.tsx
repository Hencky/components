/**
 * @title ButtonActions
 * @description 按钮
 */

import React from 'react';
import { ConfigProvider, message, Space, Row, Col } from 'antd';
import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseIcon, IconActions } from 'group6-components';
import type { IconActionsProps } from 'group6-components';
import zhCH from 'antd/lib/locale/zh_CN';

export default () => {
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

  return (
    <ConfigProvider locale={zhCH}>
      <Row>
        <Space>
          <BaseIcon icon={EditOutlined} />
          <BaseIcon icon={EditOutlined} type="error" />
          <BaseIcon icon={EditOutlined} type="primary" />
          <BaseIcon icon={EditOutlined} type="success" />
          <BaseIcon icon={EditOutlined} type="warning" />
        </Space>
      </Row>
      <Row>
        <Space>
          <BaseIcon icon={<EditOutlined className="extracls" />} />
          <BaseIcon icon={<EditOutlined />} type="error" />
          <BaseIcon icon={<EditOutlined />} type="primary" />
          <BaseIcon icon={<EditOutlined />} type="success" />
          <BaseIcon icon={<EditOutlined />} type="warning" />
        </Space>
      </Row>
      <Row>
        <Space>
          <BaseIcon loading icon={EditOutlined} />
          <BaseIcon loading icon={EditOutlined} type="error" />
          <BaseIcon loading icon={EditOutlined} type="primary" />
          <BaseIcon loading icon={EditOutlined} type="success" />
          <BaseIcon loading icon={EditOutlined} type="warning" />
        </Space>
      </Row>

      <Row>
        <Space>
          <BaseIcon disabled icon={EditOutlined} />
          <BaseIcon disabled icon={EditOutlined} type="error" />
          <BaseIcon disabled icon={EditOutlined} type="primary" />
          <BaseIcon disabled icon={EditOutlined} type="success" />
          <BaseIcon disabled icon={EditOutlined} type="warning" />
        </Space>
      </Row>

      <Row>
        <IconActions actions={iconActions} />
      </Row>
    </ConfigProvider>
  );
};
