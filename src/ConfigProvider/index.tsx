import React from 'react';
import { ConfigProvider as AConfigProvider } from 'antd';

import zhCN from 'antd/lib/locale/zh_CN';
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

export const ConfigProvider = (props) => {
  const { children, prefixCls } = props;
  return (
    <AConfigProvider locale={zhCN} prefixCls={prefixCls}>
      {children}
    </AConfigProvider>
  );
};

ConfigProvider.config = (props) => {
  AConfigProvider.config(props);
};
