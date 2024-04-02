import { isBoolean, isFunction } from 'lodash';

export const isBooleanProp = (prop: any, params: any) => {
  if (isBoolean(prop)) return prop;

  if (isFunction(prop) && !prop(params)) return false;

  return true;
};
