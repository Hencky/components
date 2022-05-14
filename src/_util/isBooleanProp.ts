export const isBooleanProp = (prop: any, params: any, defaultValue = true) => {
  if (!prop) return defaultValue;
  if (typeof prop === 'function' && !prop(params)) return false;
  return true;
};
