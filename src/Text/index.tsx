import React from 'react';
import cls from 'classnames';
import { Typography, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ParagraphProps as AParagraphProps } from 'antd/lib/typography/Paragraph';
import { ConfigProvider } from '../ConfigProvider';
import { usePrefix } from '../_hooks';

import './index.less';

const { Paragraph } = Typography;

export interface TextProps extends Omit<AParagraphProps, 'type'> {
  /** 类型 */
  type?: 'description' | 'title' | 'text' | 'primary' | AParagraphProps['type'];
  /** 显示行数 */
  rows?: number;
  /** loading装填，内部用 */
  loading?: boolean;
  children?: string;
}

export const Text: React.FC<TextProps> = (props) => {
  const { children, type, className, rows, loading, style, ellipsis, ...restProps } = props;
  const prefix = usePrefix('text');

  return (
    <ConfigProvider>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Paragraph
          className={cls(className, {
            [prefix]: true,
            [prefix + '-type-title']: type === 'title',
            [prefix + '-type-text']: type === 'text',
            [prefix + '-type-description']: type === 'description',
            [prefix + '-type-primary']: type === 'primary',
          })}
          ellipsis={typeof ellipsis === 'boolean' ? { rows } : { rows, ...ellipsis }}
          title={children}
          type={type as AParagraphProps['type']}
          style={{ marginBottom: 0, ...style }}
          {...restProps}
        >
          {children}
        </Paragraph>
      </Spin>
    </ConfigProvider>
  );
};

Text.defaultProps = {
  loading: false,
  type: 'text',
  rows: 1,
  style: {},
  ellipsis: {},
};
