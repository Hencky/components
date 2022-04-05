import { useCtx } from './useCtx';

export const usePrefix: (
  suffixCls?: string,
  customizePrefixCls?: string
) => string = (suffixCls, customizePrefixCls) => {
  const ctx = useCtx();
  return ctx.getPrefixCls(suffixCls, customizePrefixCls);
};
