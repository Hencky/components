import React, { useMemo } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import cls from 'classnames';
import { BaseAction, BaseActions } from './BaseAction';
import { usePrefix } from '../_hooks';
import type { SpaceProps } from 'antd/lib/space';
import type { BaseActionProps } from './BaseAction';

import './iconAction.less';

interface BaseIconProps {
  icon: any;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'primary' | 'error' | 'success' | 'warning';
}

export const BaseIcon: React.FC<BaseIconProps> = (props) => {
  const { icon: Icon, disabled, loading, className, type, ...restProps } = props;

  const prefix = usePrefix('icon');

  const classNames = useMemo(() => {
    return cls(className, {
      [prefix]: true,
      [`${prefix}-${type}`]: type,
      [`${prefix}-disabled`]: disabled,
      [`${prefix}-loading`]: loading,
    });
  }, [type, className, disabled, loading]);

  let icon;
  if (!Icon) {
    icon = null;
  } else if (React.isValidElement(Icon)) {
    // @ts-ignore
    icon = React.cloneElement(Icon, { className: cls(Icon.props.className, classNames), ...restProps });
  } else {
    icon = <Icon className={classNames} {...restProps} />;
  }

  return (
    <React.Fragment>
      {icon}
      <LoadingOutlined
        style={{ display: loading ? '' : 'none', cursor: 'wait' }}
        className={prefix + '-loading-placeholder'}
      />
    </React.Fragment>
  );
};

export interface IconActionProps
  extends Omit<BaseActionProps, 'children'>,
    Omit<BaseIconProps, 'disabled' | 'onClick' | 'loading'> {
  icon: any;
}

export const IconAction: React.FC<IconActionProps> = (props) => {
  const { children, icon, ...rest } = props;

  return (
    <BaseAction {...rest}>
      <BaseIcon icon={icon} />
    </BaseAction>
  );
};

export interface IconActionsProps extends SpaceProps {
  actions: (IconActionProps | React.ReactElement)[];
}

export const IconActions: React.FC<IconActionsProps> = (props) => {
  return <BaseActions {...props} component={IconAction} />;
};
