import React from 'react';
import { usePrefix } from '../_hooks';

import './index.less';

export interface DefaultTitleProps {
  title?: string;
}

export const DefaultTitle: React.FC<DefaultTitleProps> = (props) => {
  const { title } = props;
  const prefix = usePrefix('line-wrapper-title');

  return <div className={prefix}>{title}</div>;
};
