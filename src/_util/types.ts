export const isPromise = (obj: any): boolean => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};

export const isFunction = (obj: any): boolean => {
  return typeof obj === 'function';
};

export const isEmptyActions = (actions) => {
  if (isFunction(actions)) return false;
  return !(actions && actions.filter((i) => i.render !== false).length);
};
