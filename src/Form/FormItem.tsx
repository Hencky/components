import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { Form, Col } from 'antd';
import { ColProps } from 'antd/lib/col';
import { FormItemProps as AFormItemProps } from 'antd/lib/form';
import { isBooleanProp } from '../_util';

export interface FormItemProps<Values = any>
  extends AFormItemProps<Values>,
    Pick<ColProps, 'span' | 'offset' | 'push' | 'pull' | 'order' | 'flex'> {
  /** 是否渲染 */
  render?: ((props: FormItemProps<Values>) => boolean) | boolean;
  /** Col的style属性 */
  colStyle?: React.CSSProperties;
  /** Col的ClassName属性 */
  colClassName?: string;
  /** 录入组件，必填 */
  children: React.ReactElement;

  // ===== 传给子组件 =====
  /** 远程数据源 */
  remoteDataSource?: () => Promise<any>;
  /** 禁用状态 */
  disabled?: boolean | (() => boolean);
}

export function FormItem<Values>(props: PropsWithChildren<FormItemProps<Values>>) {
  const {
    span,
    offset,
    push,
    pull,
    order,
    flex,
    style,
    render,
    colStyle,
    colClassName,
    disabled,
    remoteDataSource,
    children,
    ...formItemProps
  } = props;
  const colProps = { span, offset, push, pull, order, flex };

  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    if (!remoteDataSource) return;

    remoteDataSource()
      .then((data) => {
        setDataSource(data);
      })
      .catch(() => {
        setDataSource(null);
      });
  }, [remoteDataSource]);

  if (!isBooleanProp(render, props)) return null;

  const finalDisabled = isBooleanProp(disabled, props, false);

  const ele = (
    <Form.Item {...formItemProps} style={{ marginBottom: 16, ...style }}>
      {React.cloneElement(children, { disabled: finalDisabled, dataSource })}
    </Form.Item>
  );

  if (span) {
    return (
      <Col {...colProps} className={colClassName} style={colStyle}>
        {ele}
      </Col>
    );
  }

  return ele;
}

FormItem.defaultProps = {
  span: 24,
  render: true,
  style: {},
};
