import React from 'react';

export interface IConfigContext {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `lucky-bird-ui-${suffixCls}` : 'lucky-bird-ui';
};

export const ConfigContext = React.createContext<IConfigContext>({
  getPrefixCls: defaultGetPrefixCls,
});
