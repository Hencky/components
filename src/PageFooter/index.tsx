import React, { useState } from 'react';
import { Affix, Layout } from 'antd';
import { ButtonActions, type ButtonActionsProps } from '../Actions';

export interface PageFooterProps {
  actions: ButtonActionsProps['actions'];
}

export const PageFooter: React.FC<PageFooterProps> = (props) => {
  const { actions } = props;
  const [affixed, setAffixed] = useState(false);

  return (
    <Affix
      offsetBottom={0}
      onChange={(t) => {
        setAffixed(t!);
      }}
    >
      <Layout.Footer
        style={{
          background: '#fff',
          textAlign: 'right',
          padding: 24,
          boxShadow: affixed ? '0px -6px 13px 0px #ccc' : undefined,
        }}
      >
        <ButtonActions actions={actions} />
      </Layout.Footer>
    </Affix>
  );
};
