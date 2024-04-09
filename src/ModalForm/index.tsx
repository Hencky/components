import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  type ReactNode,
  type MouseEvent,
  type ReactElement,
  type ForwardRefRenderFunction,
} from 'react';
import { type FormInstance, type FormProps } from 'antd';
import type { ModalProps as AModalProps } from 'antd/lib/modal';
import { Modal, ModalProps, type ModalInstance } from '../Modal';
import { Form } from '../Form';
import { setRef } from '../_util';

const { useForm } = Form;

export type ExcludeModalType = 'onOk' | 'onCancel' | 'modalProps' | 'children';

export interface ModalFormContext {
  form: FormInstance;
  visible: boolean;
  open: boolean;
  values: Record<string, any>;
}

export interface ModalFormProps extends Omit<ModalProps, ExcludeModalType> {
  /** 点击确定回调 */
  onOk?: (e: MouseEvent<HTMLElement>, ctx: ModalFormContext) => void;
  /** 点击遮罩层或右上角叉或取消按钮的回调 */
  onCancel?: (e: MouseEvent<HTMLElement>, ctx: ModalFormContext) => void;
  /** 表单属性 */
  formProps?: Omit<FormProps, 'form' | 'initialValues'>;
  /** Modal的其他属性 */
  modalProps?: Omit<AModalProps, ExcludeModalType | 'onOk' | 'onCancel'> & {
    footerRender?: (ctx: ModalFormContext) => ReactNode;
  };

  children?: ReactElement;

  /** 表单初始值 */
  initialValues?: Record<string, any>;
  remoteValues?: () => Promise<any>;
}

export interface ModalFormInstance {
  open: (props: ModalFormProps) => void;
  close: (e?: MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface ModalFormProps {
  form?: FormInstance;
  open?: boolean;
}

export const IModalForm: ForwardRefRenderFunction<ModalFormInstance, ModalFormProps> = (props, ref) => {
  const { form: propsForm, open } = props;

  const modalRef = useRef<ModalInstance>();
  const propsRef = useRef<ModalFormProps>();

  const [form] = propsForm ? [propsForm] : useForm();

  const getModalFormContext = () => ({ form, open: open!, visible: open!, values: form.getFieldsValue() });

  const { modalProps, formProps, title, children, width, remoteValues } = propsRef.current || {};
  const { footerRender, footer, ...restModalProps } = modalProps || {};

  useImperativeHandle(
    ref,
    // @ts-expect-error
    () => {
      return {
        open: (params) => {
          setRef(propsRef, params);

          const { initialValues, onOk, onCancel, ...restParams } = params;

          if (initialValues) {
            form.setFieldsValue(initialValues);
          }

          return modalRef.current?.open({
            ...restParams,
            onCancel: (e) => {
              form.resetFields();
              return onCancel?.(e, getModalFormContext());
            },
            onOk: async (e) => {
              // ===== 增加表单校验逻辑 =====
              await form.validateFields();
              return onOk?.(e, getModalFormContext());
            },
          });
        },
        close: modalRef.current?.close,
      };
    },
    [form]
  );

  // ===== footer支持ctx =====
  const renderFooter = () => {
    return footerRender ? footerRender(getModalFormContext()) : footer;
  };

  return (
    <Form component="div" {...formProps} remoteValues={remoteValues} form={form}>
      {/* @ts-expect-error */}
      <Modal width={width} title={title} footer={renderFooter()} ref={modalRef} {...restModalProps}>
        {children && React.cloneElement(children, { ...getModalFormContext() })}
      </Modal>
    </Form>
  );
};

export const ModalForm = forwardRef(IModalForm);
