import type { MutableRefObject } from 'react';

export const setRef: <Ref>(ref: MutableRefObject<Ref>, value: Ref) => void = (ref, value) => {
  ref.current = value;
};
