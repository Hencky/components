import React from 'react';
import { Switch as ASwitch } from 'antd';
import type { SwitchProps as ASwitchProps } from 'antd/lib/switch';

export interface SwitchProps<T = any, K = any> extends Omit<ASwitchProps, 'onChange'> {
  checkedValue?: T;
  unCheckedValue?: K;
  onChange?: (value: T | K) => void;
  value?: T | K;
}

export const OSwitch: React.FC<SwitchProps> = (props) => {
  const { checkedValue = true, unCheckedValue = false, checked, onChange } = props;

  return (
    <ASwitch
      onChange={(checked) => {
        onChange?.(checked ? checkedValue : unCheckedValue);
      }}
      // eslint-disable-next-line
      checked={checked == checkedValue}
    />
  );
};
