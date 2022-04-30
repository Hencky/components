export const canRender = (render: any, props: any) => {
  if (!render) return false;
  if (typeof render === 'function' && !render(props)) return false;
  return true;
};
