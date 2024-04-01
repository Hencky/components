import React, { Fragment, useRef } from 'react';
import { ButtonAction, Modal, ModalInstance } from 'lucky-bird-ui';

const demo = () => {
  const ref = useRef<ModalInstance>();

  return (
    <Fragment>
      <ButtonAction
        onClick={async () => {
          const result = await ref.current?.open({
            title: '弹框',
            width: 800,
            children: <div>abc</div>,
            onOk: async () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve('abc');
                }, 2000);
              });
            },
          });

          console.log('result', result);
        }}
      >
        弹框
      </ButtonAction>
      <Modal ref={ref} />
    </Fragment>
  );
};

export default demo;
