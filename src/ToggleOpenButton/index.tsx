import React from 'react';
import cls from 'classnames';
import { DownOutlined } from '@ant-design/icons';
import { IconAction } from '../Actions';
import { usePrefix } from '../_hooks';

import './index.less';

export interface ToggleOpenButtonProps {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onClick: (isOpen: boolean) => void;
}

export const ToggleOpenButton: React.FC<ToggleOpenButtonProps> = (props) => {
  const { open, onClick, className, style } = props;
  const prefix = usePrefix('toggle-open-button');

  return (
    <IconAction
      text={open ? '收起' : '展开'}
      textPosition="start"
      type="primary"
      textStyle={{ fontSize: 14 }}
      icon={
        <DownOutlined
          className={cls({
            [prefix]: true,
            [prefix + '-rotate']: open,
          })}
        />
      }
      onClick={() => {
        onClick(open);
      }}
      className={className}
      style={style}
    />
  );
};
