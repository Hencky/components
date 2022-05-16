import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { Form as AForm, Spin } from 'antd';
import type { FormProps as AFormProps } from 'antd/lib/form';

export interface FormProps<Values = any> extends AFormProps<Values> {
  remoteValues?: () => Promise<Values>;
}

export function Form<Values = any>(props: PropsWithChildren<FormProps<Values>>) {
  const { remoteValues, form = AForm.useForm()[0], ...restProps } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!remoteValues) return;

    setLoading(true);
    remoteValues()
      .then((values) => {
        // TODO: antd没有暴露出RecursivePartial类型，先不考虑手写，断言成any
        return form.setFieldsValue(values as any);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [remoteValues]);

  return (
    <Spin spinning={loading}>
      <AForm form={form} {...restProps} />
    </Spin>
  );
}
