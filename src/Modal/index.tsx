import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Modal as AModal } from 'antd';
import { isPromise, setRef } from '../_util';
import { ConfigProvider } from '../ConfigProvider';
import type { ModalProps as AModalProps } from 'antd/lib/modal';

export type ExcludeModalType = 'title' | 'width' | 'children' | 'onOk' | 'onCancel' | 'confirmLoading';

export interface ModalProps extends Pick<AModalProps, ExcludeModalType> {
  modalProps?: Omit<AModalProps, ExcludeModalType | 'visible'>;
  onOpen?: () => void;
}

export interface ModalInstance {
  open: (props: ModalProps) => void;
  close: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const IModal: React.ForwardRefRenderFunction<ModalInstance> = (_, ref) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const propsRef = useRef<ModalProps>();

  const onClose = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    propsRef.current?.onCancel?.(e!);
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      open: (props) => {
        setRef(propsRef, props);
        const { onOpen } = props!;
        onOpen?.();
        setVisible(true);
      },
      close: onClose,
    };
  });

  const { modalProps, title, children, width, onOk } = propsRef.current || {};

  const handleOk = (e) => {
    setConfirmLoading(true);
    const cb = onOk?.(e);
    if (isPromise(cb)) {
      (cb as unknown as Promise<any>).then(() => {
        setConfirmLoading(false);
      });
    } else {
      setConfirmLoading(false);
    }
  };

  return (
    <ConfigProvider>
      <AModal
        {...modalProps}
        onCancel={onClose}
        visible={visible}
        confirmLoading={confirmLoading}
        title={title}
        width={width}
        onOk={handleOk}
      >
        {children}
      </AModal>
    </ConfigProvider>
  );
};

export const Modal = forwardRef(IModal);
