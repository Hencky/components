import React from 'react';
import { Space } from 'antd';
import { RopeContainer } from '../RopeContainer';
import type { RopeContainerProps } from '../RopeContainer';

export type BaseActionProps = RopeContainerProps;

export const BaseAction = (props: React.PropsWithChildren<BaseActionProps>) => {
  const { tooltip, confirm, container, disabled, render, onClick, children, onStatusChange, ...rest } = props;

  return (
    <RopeContainer
      tooltip={tooltip}
      confirm={confirm}
      disabled={disabled}
      onClick={onClick}
      render={render}
      container={container}
      onStatusChange={onStatusChange}
    >
      {React.cloneElement(children, rest)}
    </RopeContainer>
  );
};

export interface BaseActionsProps<T = any> {
  component: any;
  actions: (T | React.ReactElement)[];
}

export const BaseActions = (props: BaseActionsProps) => {
  const { actions, component: Component, ...rest } = props;

  return (
    <Space {...rest}>
      {actions.map((item, index) => {
        if (React.isValidElement(item)) {
          return React.cloneElement(item, { key: item.key ?? index });
        }
        return <Component key={index} {...item} />;
      })}
    </Space>
  );
};
