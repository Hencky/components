import React from 'react';
import { Modal } from 'antd';
import type { ModalFuncProps } from 'antd/lib/modal';

export interface ModalConfirmProps extends ModalFuncProps {
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
}

export const ModalConfirm: React.FC<ModalConfirmProps> = (props) => {
  const { children, type = 'warning', ...restProps } = props;

  // @ts-expect-error
  return React.cloneElement(children, {
    onClick: () => {
      Modal[type]({
        ...restProps,
        okButtonProps: {
          ...restProps.okButtonProps,
        },
      });
    },
  });
};
