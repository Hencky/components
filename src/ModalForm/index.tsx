import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Modal, type FormInstance, type FormProps } from 'antd';
import type { ModalProps as AModalProps } from 'antd/lib/modal';
import { Form } from '../Form';
import { isPromise, setRef } from '../_util';

const { useForm } = Form;

export type ExcludeModalType = 'title' | 'width' | 'children' | 'confirmLoading';

export interface ModalFormContext {
  form: FormInstance;
  visible: boolean;
}

export interface ModalFormProps extends Pick<AModalProps, ExcludeModalType> {
  /** 打开弹框的回调 */
  onOpen?: (ctx: ModalFormContext) => void;
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLElement>, ctx: ModalFormContext) => void;
  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onCancel?: (e: React.MouseEvent<HTMLElement>, ctx: ModalFormContext) => void;
  /** 表单属性 */
  formProps?: Omit<FormProps, 'form' | 'initialValues'>;
  /** Modal的其他属性 */
  modalProps?: Omit<AModalProps, ExcludeModalType | 'visible' | 'onOk' | 'onCancel'> & {
    footerRender?: (ctx: ModalFormContext) => React.ReactNode;
  };
  children: React.ReactElement;

  initialValues?: Record<string, any>;
  remoteValues?: () => Promise<any>;
}

export interface ModalFormInstance {
  open: (props: ModalFormProps) => void;
  close: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface ModalFormProps {
  form?: FormInstance;
}

const IModalForm: React.ForwardRefRenderFunction<ModalFormInstance, ModalFormProps> = (props, ref) => {
  const { form: propsForm } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = propsForm ? [propsForm] : useForm();

  const propsRef = useRef<ModalFormProps>();

  const getModalFormContext = () => ({ form, visible });

  const onClose = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    propsRef.current?.onCancel?.(e!, getModalFormContext());
    form.resetFields();
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      open: (props) => {
        setRef(propsRef, props);
        const { onOpen, initialValues } = props!;

        if (initialValues) {
          form.setFieldsValue(initialValues);
        }

        onOpen?.(getModalFormContext());
        setVisible(true);
      },
      close: onClose,
    };
  });

  const { modalProps, formProps, title, children, width, onOk, remoteValues } = propsRef.current || {};
  const { footerRender, footer, ...restModalProps } = modalProps || {};

  // ===== footer支持ctx =====
  const renderFooter = () => {
    return footerRender ? footerRender(getModalFormContext()) : footer;
  };

  // ==== 确定按钮回调，返回promise按钮自动进入loading =====
  const handleOk = (e) => {
    setConfirmLoading(true);
    return form
      .validateFields()
      .then(() => {
        const cb = onOk?.(e, getModalFormContext());
        if (isPromise(cb)) {
          return (cb as unknown as Promise<any>).then(() => {
            setConfirmLoading(false);
          });
        } else {
          setConfirmLoading(false);
          return;
        }
      })
      .catch(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      {...restModalProps}
      footer={renderFooter()}
      onCancel={onClose}
      visible={visible}
      confirmLoading={confirmLoading}
      title={title}
      width={width}
      onOk={handleOk}
    >
      <Form {...formProps} remoteValues={remoteValues} form={form}>
        {children && React.cloneElement(children, { ...getModalFormContext() })}
      </Form>
    </Modal>
  );
};

export const ModalForm = forwardRef(IModalForm);
