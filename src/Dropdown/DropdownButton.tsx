import React, { useState, useRef } from 'react';
import { Dropdown, Menu } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import { debounce } from 'lodash';
import { ButtonAction } from '../Actions';
import type { ButtonActionProps } from '../Actions';

export interface DropdownButtonProps extends Omit<DropDownProps, 'overlay' | 'visible' | 'onVisibleChange'> {
  actions: ButtonActionProps[];
}

export const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { actions, children, ...rest } = props;
  const [visible, setVisible] = useState(false);
  const canHideOverlayRef = useRef(true);
  const loadingRef = useRef(false);

  const onLoadingChange = (preLoading, curLoading) => {
    // loading关闭后，仍然是展开下拉状态，手动关闭
    if (preLoading && !curLoading) {
      if (visible) {
        setVisible(false);
      }
    }
  };

  const onStatusChange: ButtonActionProps['onStatusChange'] = ({ popconfirmVisible, loading }) => {
    onLoadingChange(loadingRef.current, loading);
    loadingRef.current = loading;

    if (popconfirmVisible || loading) {
      canHideOverlayRef.current = false;
      setVisible(true);
      return;
    }

    canHideOverlayRef.current = true;
  };

  const renderActionButtons = (actions: ButtonActionProps[] = []) => {
    return actions.map((item, index) => {
      return (
        <Menu.Item key={item.title ?? index}>
          <ButtonAction {...item} onStatusChange={onStatusChange} />
        </Menu.Item>
      );
    });
  };

  // TODO: antd升级4.20写法变更
  const menu = <Menu>{renderActionButtons(actions)}</Menu>;

  const onVisibleChange = (visible) => {
    if (!canHideOverlayRef.current) return;
    if (loadingRef.current) return;
    setVisible(visible);
  };

  return (
    <Dropdown
      overlay={menu}
      visible={visible}
      onVisibleChange={debounce(onVisibleChange, 100)}
      overlayStyle={{ zIndex: 1000 }}
      {...rest}
    >
      {children}
    </Dropdown>
  );
};
