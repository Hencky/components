import React, { useEffect, useState, type PropsWithChildren } from 'react';
import { Form, Col } from 'antd';
import { ColProps } from 'antd/lib/col';
import { isFunction, isEqual } from 'lodash';
import { type NamePath } from 'antd/lib/form/interface';
import { type FormItemProps as AFormItemProps } from 'antd/lib/form';
import { isBooleanProp } from '../_util';

export type SingleDepCondition<T = any> = {
  condition: Record<string, any>[];
  result?: T;
};

export type DepCondition<T> = SingleDepCondition<T> | SingleDepCondition<T>[];

export type Deps = {
  deps: NamePath[];
  visible?: DepCondition<boolean>;
};

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

  dependency?: Deps;

  // ===== 传给子组件 =====
  /** 远程数据源 */
  remoteDataSource?: () => Promise<any[]>;
  remoteOptions?: () => Promise<any[]>;

  /** 数据源 */
  dataSource?: any[];
  options?: any[];
  /** 数据源名称，比如 treeSelect 是 treeData */
  dataSourceKey?: string;
  optionsKey?: string;
  optionsPropName?: string;
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
    remoteOptions,
    dataSource: propDataSource,
    options: propsOptions,
    children,
    dataSourceKey = 'options',
    optionsKey = 'options',
    optionsPropName = 'options',
    dependency,
    ...formItemProps
  } = props;
  const colProps = { span: span!, offset, push, pull, order, flex };

  const [dataSource, setDataSource] = useState<any[]>();

  const finalRemoteOptions = remoteOptions || remoteDataSource;
  const finalPropsOptions = propsOptions || propDataSource;
  const finalOptionsPropName = optionsPropName || optionsKey || dataSourceKey;

  useEffect(() => {
    if (!finalRemoteOptions) return;

    finalRemoteOptions()
      .then((data) => {
        setDataSource(data);
      })
      .catch(() => {
        setDataSource([]);
      });
  }, [finalRemoteOptions]);

  useEffect(() => {
    if (finalPropsOptions) {
      setDataSource(finalPropsOptions);
    }
  }, [finalPropsOptions]);

  if (!isBooleanProp(render, props)) return null;

  const finalDisabled = isBooleanProp(disabled, props, false);

  const itemElement = (
    <Form.Item {...formItemProps} style={style}>
      {isFunction(children)
        ? children
        : React.cloneElement(children as React.ReactElement, {
            disabled: finalDisabled,
            ...(dataSource ? { [finalOptionsPropName]: dataSource } : {}),
          })}
    </Form.Item>
  );

  let ele = itemElement;

  if (dependency) {
    const { visible, deps } = dependency as Deps;
    const { condition } = visible! as SingleDepCondition<boolean>;
    ele = (
      <Form.Item dependencies={deps} noStyle>
        {(form) => {
          if (condition.some((c) => deps.every((key, idx) => isEqual(form.getFieldValue(key), c[idx])))) {
            return itemElement;
          }

          return null;
        }}
      </Form.Item>
    );
  }

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
