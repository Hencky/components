import React from 'react';
import cls from 'classnames';
import { usePrefix } from '../_hooks';

import './index.less';

export interface DefaultTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const DefaultTitle: React.FC<DefaultTitleProps> = (props) => {
  const { title, className, ...rest } = props;
  const prefix = usePrefix('line-wrapper-title');

  return (
    <div className={cls(prefix, className)} {...rest}>
      {title}
    </div>
  );
};
