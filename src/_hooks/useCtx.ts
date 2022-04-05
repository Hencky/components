import { useContext } from 'react';
import { ConfigContext } from '../ConfigProvider';

export const useCtx = () => {
  const ctx = useContext(ConfigContext);
  return ctx;
};
