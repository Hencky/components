import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import cls from 'classnames';
import { usePrefix } from '../../_hooks';

import './index.less';

export interface BaseIconProps {
  icon: any;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'primary' | 'error' | 'success' | 'warning';
  text?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  textPosition?: 'start' | 'end';
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  style?: React.CSSProperties;
}

export const BaseIcon: React.FC<BaseIconProps> = (props) => {
  const {
    icon: Icon,
    disabled,
    type,
    loading,
    onClick,
    className,
    style,
    text,
    textPosition = 'end',
    textClassName,
    textStyle,
    ...restProps
  } = props;

  const prefix = usePrefix('base-icon');

  const loadingCls = cls({
    [`${prefix}-icon-loading`]: loading,
  });

  let icon;
  if (!Icon) {
    icon = null;
  } else if (React.isValidElement(Icon)) {
    icon = React.cloneElement(Icon as React.ReactElement, {
      className: cls((Icon as React.ReactElement).props.className, loadingCls),
      ...restProps,
    });
  } else {
    icon = <Icon className={loadingCls} {...restProps} />;
  }

  const textEle = text && (
    <span className={cls(textClassName, prefix + '-text', `${prefix}-text-${textPosition}`)} style={textStyle}>
      {text}
    </span>
  );

  return (
    <span
      className={cls(className, {
        [prefix]: true,
        [`${prefix}-${type}`]: type,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-loading`]: loading,
      })}
      onClick={onClick}
      style={style}
    >
      {textPosition === 'start' && textEle}
      {icon}
      <LoadingOutlined
        className={cls({
          [`${prefix}-loading-placeholder`]: !loading,
        })}
      />
      {textPosition === 'end' && textEle}
    </span>
  );
};
