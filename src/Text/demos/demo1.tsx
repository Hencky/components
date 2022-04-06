/**
 * @title Text
 * @description 文本组件
 */

import React from 'react';
import { Divider, Space } from 'antd';
import { Text } from '@pms/ui';

export default () => {
  return (
    <div>
      <Text>文本组件</Text>

      <Divider />

      <Text>
        超长文本，鼠标划入有提示。 超长文本，鼠标划入有提示。 超长文本，鼠标划入有提示。 超长文本，鼠标划入有提示。
        超长文本，鼠标划入有提示。 超长文本，鼠标划入有提示。 超长文本，鼠标划入有提示。 超长文本，鼠标划入有提示。
        超长文本，鼠标划入有提示。
      </Text>

      <Divider />

      <Text rows={2}>
        超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示
        超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示
        超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示
        超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示
        超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示 超长文本多行显示
        超长文本多行显示 超长文本多行显示
      </Text>

      <Divider />

      <Space direction="vertical">
        <Text type="title">标题文本</Text>
        <Text type="text">普通文本</Text>
        <Text type="description">描述文本</Text>
        <Text type="primary">主题色文本</Text>
        <Text type="secondary">次要文本</Text>
        <Text type="success">成功文本</Text>
        <Text type="warning">警告文本</Text>
        <Text type="danger">错误文本</Text>
      </Space>
    </div>
  );
};
