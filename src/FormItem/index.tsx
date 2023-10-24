import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { Form, Col } from 'antd';
import { ColProps } from 'antd/lib/col';
import { FormItemProps as AFormItemProps } from 'antd/lib/form';
import { isBooleanProp, isFunction } from '../_util';
import useDependency, { Dependency } from './hooks/useDependency';
import { FormInstance } from 'antd/es/form/Form';

export interface FormItemProps<Values = any>
  extends AFormItemProps<Values>,
    Pick<ColProps, 'offset' | 'push' | 'pull' | 'order' | 'flex'> {
  /** 扩展null属性 */
  span?: ColProps['span'] | null;
  /** 是否渲染 */
  render?: ((props: FormItemProps<Values>) => boolean) | boolean;
  /** Col的style属性 */
  colStyle?: React.CSSProperties;
  /** Col的ClassName属性 */
  colClassName?: string;
  /** 表单间的值依赖关系 */
  deps?: Dependency;
  /** form实例 */
  form?: FormInstance;
  // ===== 传给子组件 =====
  /** 远程数据源 */
  remoteDataSource?: () => Promise<any[]>;
  /** 数据源 */
  dataSource?: any[];
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
    dataSource: propDataSource,
    deps,
    children,
    form,
    ...formItemProps
  } = props;
  const colProps = { span: span!, offset, push, pull, order, flex };

  const [dataSource, setDataSource] = useState<any[]>();

  const { visible, options } = useDependency({
    form,
    children,
    deps,
  });

  useEffect(() => {
    if (!remoteDataSource) return;

    remoteDataSource()
      .then((data) => {
        setDataSource(data);
      })
      .catch(() => {
        setDataSource([]);
      });
  }, [remoteDataSource]);

  useEffect(() => {
    if (propDataSource) {
      setDataSource(propDataSource);
    }
  }, [propDataSource]);

  if (!isBooleanProp(render, props)) return null;

  const finalDisabled = isBooleanProp(disabled, props, false);
  if (!visible && deps) return null;

  const ele = (
    <Form.Item {...formItemProps} style={style}>
      {isFunction(children)
        ? children
        : React.cloneElement(children as React.ReactElement, {
            disabled: finalDisabled,
            ...(dataSource ? { dataSource } : {}),
          })}
    </Form.Item>
  );

  if (span !== null) {
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
  disabled: false,
};
