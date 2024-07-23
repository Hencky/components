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
  options?: DepCondition<any[]>;
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
  /**
   * @deprecated remoteOptions
   */
  remoteDataSource?: () => Promise<any[]>;
  remoteOptions?: () => Promise<any[]>;

  /** 数据源 */
  /**
   * @deprecated remoteOptions
   */
  dataSource?: any[];
  options?: any[];
  /** 数据源名称，比如 treeSelect 是 treeData */
  /**
   * @deprecated remoteOptions
   */
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
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        setDataSource([]);
      });
  }, [finalRemoteOptions]);

  useEffect(() => {
    if (finalPropsOptions) {
      setDataSource(finalPropsOptions);
    }
  }, [finalPropsOptions]);

  if (!isBooleanProp(render, props)) return null;

  const finalDisabled = isBooleanProp(disabled, props);

  const renderColWrapper = (ele) => {
    if (span !== null) {
      return (
        <Col {...colProps} className={colClassName} style={colStyle}>
          {ele}
        </Col>
      );
    }

    return ele;
  };

  const renderChildren = (children) => {
    const { dependencies } = formItemProps;

    // ===== 增加dependencies值 =====
    if (isFunction(children)) {
      return (form) => {
        const depValues = dependencies ? dependencies.map((depName) => form.getFieldValue(depName)) : undefined;
        return children(form, depValues);
      };
    }

    if (!formItemProps.name) {
      return children;
    }

    return React.cloneElement(children as React.ReactElement, {
      disabled: finalDisabled,
      ...(dataSource ? { [finalOptionsPropName]: dataSource } : {}),
    });
  };

  const itemElement = (
    <Form.Item {...formItemProps} style={style}>
      {renderChildren(children)}
    </Form.Item>
  );

  if (dependency) {
    const { visible, deps, options } = dependency as Deps;

    const { condition: visibleCondition, result: visibleResult = true } = (visible ||
      {}) as SingleDepCondition<boolean>;
    const { condition: optionCondition, result: optionResult } = (options || {}) as SingleDepCondition<any[]>;

    return (
      <Form.Item dependencies={deps} noStyle>
        {(form) => {
          const isMatched = (condition) =>
            condition.some((c) => deps.every((key, idx) => isEqual(form.getFieldValue(key), c[idx])));

          if (options) {
            // TODO: 更新组件报警告，加一个延迟解决
            setTimeout(() => {
              setDataSource(isMatched(optionCondition) ? optionResult : finalPropsOptions);
            });
          }

          if (
            visible &&
            ((isMatched(visibleCondition) && visibleResult) || (!isMatched(visibleCondition) && !visibleResult))
          ) {
            return renderColWrapper(itemElement);
          }

          if (!visible) {
            return renderColWrapper(itemElement);
          }

          return null;
        }}
      </Form.Item>
    );
  }

  return renderColWrapper(itemElement);
}

FormItem.defaultProps = {
  span: 24,
  render: true,
  style: {},
  disabled: false,
};
