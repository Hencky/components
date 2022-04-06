import React from 'react';

export interface IConfigContext {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `pms-ui-${suffixCls}` : 'pms-ui';
};

export const ConfigContext = React.createContext<IConfigContext>({
  getPrefixCls: defaultGetPrefixCls,
});
