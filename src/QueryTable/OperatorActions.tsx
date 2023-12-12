import React, { createElement } from 'react';
import { Space } from 'antd';
import {
  IconAction,
  TextAction,
  ButtonAction,
  type TextActionProps,
  type IconActionProps,
  type ButtonActionProps,
} from '../Actions';
import { DropdownButton, type DropdownButtonProps } from '../Dropdown';
import { type QueryTableInstance } from './interface';

export type QueryTableContext<RecordType = any> = QueryTableInstance<RecordType>;

export type QueryTAbleActionClickType<RecordType> = (
  e: React.MouseEvent<HTMLButtonElement>,
  ctx: QueryTableContext<RecordType>
) => void;

export type ActionType<T, K, R> =
  | { actionType?: T } & Omit<K, 'onClick'> & {
        onClick: QueryTAbleActionClickType<R>;
      };

export type QueryTableActionType<RecordType = any> =
  | ActionType<'button', ButtonActionProps, RecordType>
  | ActionType<'text', TextActionProps, RecordType>
  | ActionType<'icon', IconActionProps, RecordType>
  | ({ actionType: 'dropdownbutton' } & DropdownButtonProps);

const Actions = {
  button: ButtonAction,
  icon: IconAction,
  text: TextAction,
  dropdownbutton: DropdownButton,
};

export interface OperatorActionsProps {
  actions?: QueryTableActionType[];
  getCtx: () => QueryTableInstance;
}

export const OperatorActions: React.FC<OperatorActionsProps> = (props) => {
  const { actions, getCtx } = props;

  if (!actions) return null;

  const getActions = (actions: QueryTableActionType[] = []) => {
    return actions.map((item, idx) => {
      const { actionType = 'button', ...restProps } = item;

      // @ts-expect-error
      return createElement(Actions[actionType], {
        key: idx,
        ...restProps,
        onClick: (e) => {
          // @ts-expect-error
          return item.onClick(e, getCtx());
        },
      });
    });
  };

  return <Space>{getActions(actions)}</Space>;
};
