/**
 * @title TextAction
 * @description 按钮
 */

import React from 'react';
import { ConfigProvider, Space, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { IconAction } from '@lucky-bird/ui';
import zhCH from 'antd/lib/locale/zh_CN';

const IconActionDemo = () => {
  const onClick = (e) => {
    console.log('click', e);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  };

  return (
    <ConfigProvider locale={zhCH}>
      <Row>
        <Space>
          <IconAction tooltip="编辑" onClick={onClick} icon={EditOutlined} />
          <IconAction tooltip="编辑" onClick={onClick} icon={EditOutlined} type="error" />
          <IconAction tooltip="编辑" onClick={onClick} icon={EditOutlined} type="primary" />
          <IconAction tooltip="编辑" onClick={onClick} icon={EditOutlined} type="success" />
          <IconAction tooltip="编辑" onClick={onClick} icon={EditOutlined} type="warning" />
        </Space>
      </Row>
      <Row>
        <Space>
          <IconAction onClick={onClick} icon={<EditOutlined className="extracls" />} />
          <IconAction onClick={onClick} icon={<EditOutlined />} type="error" />
          <IconAction onClick={onClick} icon={<EditOutlined />} type="primary" />
          <IconAction onClick={onClick} icon={<EditOutlined />} type="success" />
          <IconAction onClick={onClick} icon={<EditOutlined />} type="warning" />
        </Space>
      </Row>
      <Row>
        <Space>
          <IconAction onClick={onClick} loading icon={EditOutlined} />
          <IconAction onClick={onClick} loading icon={EditOutlined} type="error" />
          <IconAction onClick={onClick} loading icon={EditOutlined} type="primary" />
          <IconAction onClick={onClick} loading icon={EditOutlined} type="success" />
          <IconAction onClick={onClick} loading icon={EditOutlined} type="warning" />
        </Space>
      </Row>

      <Row>
        <Space>
          <IconAction onClick={onClick} disabled icon={EditOutlined} />
          <IconAction onClick={onClick} disabled icon={EditOutlined} type="error" />
          <IconAction onClick={onClick} disabled icon={EditOutlined} type="primary" />
          <IconAction onClick={onClick} disabled icon={EditOutlined} type="success" />
          <IconAction onClick={onClick} disabled icon={EditOutlined} type="warning" />
        </Space>
      </Row>

      <Row>
        <Space>
          <IconAction onClick={onClick} text="编辑" icon={EditOutlined} />
          <IconAction onClick={onClick} text="编辑" icon={EditOutlined} type="error" />
          <IconAction onClick={onClick} text="编辑" icon={EditOutlined} type="primary" />
          <IconAction onClick={onClick} text="编辑" icon={EditOutlined} type="success" />
          <IconAction onClick={onClick} text="编辑" icon={EditOutlined} type="warning" />
        </Space>
      </Row>
    </ConfigProvider>
  );
};

export default IconActionDemo;
