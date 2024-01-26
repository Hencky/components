import React, { type FC } from 'react';

export const RequiredTitle: FC = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
      <span style={{ color: '#ff4d4f', paddingLeft: 4 }}>*</span>
    </div>
  );
};
