import React from 'react';
import { Button } from 'antd';
import { BaseAction, BaseActions } from './BaseAction';
import type { SpaceProps } from 'antd/lib/space';
import type { ButtonProps } from 'antd/lib/button';
import type { BaseActionProps } from './BaseAction';

export interface ButtonActionProps
  extends Omit<BaseActionProps, 'children'>,
    Omit<ButtonProps, 'disabled' | 'onClick'> {}

export const ButtonAction: React.FC<ButtonActionProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <BaseAction {...rest}>
      <Button>{props.children}</Button>
    </BaseAction>
  );
};

export interface ButtonActionsProps extends SpaceProps {
  actions: (ButtonActionProps | React.ReactElement)[];
}

export const ButtonActions: React.FC<ButtonActionsProps> = (props) => {
  return <BaseActions {...props} component={ButtonAction} />;
};
