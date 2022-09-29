import React from 'react';
import { DefaultTitle } from './Plugins';
import { usePrefix } from '../_hooks';

import './index.less';

export interface LineItemProps {
  index: number;
  length: number;
  gutter?: number;
}

export interface LineProps {
  title?: string;
  children: React.ReactElement[];
  gutter?: number;
  titleRender?: () => React.ReactElement;
}

export const LineItem: React.FC<LineItemProps> = (props) => {
  const { children, length, gutter = 0, index, ...restProps } = props;
  const prefix = usePrefix('line-wrapper-item');

  if (length <= 1) {
    return <div>{children}</div>;
  }

  const isLast = length - 1 === index;

  return (
    <div className={`${prefix}`} style={{ marginBottom: !isLast ? gutter : 0 }}>
      <div className={`${prefix}-line`}>
        {index > 0 && <div className={`${prefix}-line-top`} />}
        <div className={`${prefix}-line-left`} />
        {!isLast && <div className={`${prefix}-line-bottom`} style={{ height: `calc(50% + ${gutter}px)` }} />}
      </div>
      <div {...restProps}>{children}</div>
    </div>
  );
};

export const LineWrapper: React.FC<LineProps> = (props) => {
  const prefix = usePrefix('line-wrapper');
  const { children, title, gutter, titleRender } = props;

  const flatChildren = children.flat();

  const renderLineItem = React.useCallback(() => {
    return flatChildren.map((item, index, { length }) => {
      return React.createElement(LineItem, { index, length, gutter, key: index }, item);
    });
  }, [children]);

  return (
    <div className={prefix}>
      {flatChildren.length > 1 && (
        <div className={prefix + '-title-wrapper'}>{!titleRender ? <DefaultTitle title={title} /> : titleRender()}</div>
      )}
      {renderLineItem()}
    </div>
  );
};
