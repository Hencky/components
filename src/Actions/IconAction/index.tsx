import React from 'react';
import { BaseAction, BaseActions } from '../BaseAction';
import type { SpaceProps } from 'antd/lib/space';
import type { BaseActionProps } from '../BaseAction';
import { BaseIcon, type BaseIconProps } from './BaseIcon';

export interface IconActionProps
  extends Omit<BaseActionProps, 'children'>,
    Omit<BaseIconProps, 'disabled' | 'onClick'> {}

export const IconAction: React.FC<IconActionProps> = (props) => {
  const { children, icon, ...rest } = props;

  return (
    <BaseAction {...rest}>
      <BaseIcon icon={icon} />
    </BaseAction>
  );
};

export interface IconActionsProps extends SpaceProps {
  actions: IconActionProps[];
}

export const IconActions: React.FC<IconActionsProps> = (props) => {
  return <BaseActions {...props} component={IconAction} />;
};
