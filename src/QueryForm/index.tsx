import React, { useState, useCallback } from 'react';
import { Form, Row, Col } from 'antd';
import cls from 'classnames';
import type { FormInstance, FormProps } from 'antd/lib/form';
import { type FormItemProps, FormItem } from '../FormItem';
import { ButtonActions, type ButtonActionProps } from '../Actions';
import { ToggleOpenButton } from '../ToggleOpenButton';
import { usePrefix } from '../_hooks';
import { getFormKey } from '../_util';

import './index.less';

export interface QueryFormProps<Values = any> extends Omit<FormProps<Values>, 'fields'> {
  /** 表单搜索字段配置，同FormItem */
  fields: FormItemProps[];
  /** 表单实例 */
  form?: FormInstance<Values>;
  /** 显示字段长度，2/3/4 默认3 */
  showFieldsLength?: number;
  /** 默认展开，默认false */
  defaultExpand?: boolean;
  /** 点击查询时的回调函数 */
  onSubmit?: (values: any) => Promise<void> | undefined;
  /** 点击重置时的回调函数 */
  onReset?: () => void;
  /** 是否显示分割线， 默认true */
  showDivider?: boolean;

  /** 只有一个字段时，单一展示 */
  allowSingleSearch?: boolean;

  resetActionProps?: Omit<ButtonActionProps, 'onClick'>;
  queryActionProps?: Omit<ButtonActionProps, 'onClick'>;
}

export const QueryForm: <Values = any>(props: React.PropsWithChildren<QueryFormProps<Values>>) => React.ReactElement = (
  props
) => {
  const prefix = usePrefix('queryform');

  const {
    fields: allFields,
    form = Form.useForm()[0],
    onReset,
    onSubmit,
    allowSingleSearch = true,
    showFieldsLength = 3,
    defaultExpand = false,
    showDivider = false,
    resetActionProps,
    queryActionProps,
    ...formProps
  } = props;

  const [isOpen, setIsOpen] = useState(defaultExpand);

  const colLen = showFieldsLength + 1;
  const fields = allFields.filter((i) => i.render !== false);

  const needCollapse = fields.length > showFieldsLength;
  const isSingleSearch = allowSingleSearch && fields.length === 1;

  // ===== 重置 =====
  const handleReset = useCallback(async () => {
    form.resetFields();
    return await onReset?.();
  }, [form, onReset]);

  // ===== 查询 =====
  const handleSearch = async () => {
    try {
      const values = await form.validateFields();
      return await onSubmit?.(values);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return;
    }
  };

  // ===== 计算span =====
  const finalSpan = isSingleSearch ? 8 : 24 / colLen;

  // ===== 字段渲染，超出隐藏 =====
  const renderFields = (fields: FormItemProps[]) => {
    return fields.map((field, index) => {
      const finalLabel = isSingleSearch ? undefined : field.label;
      const fieldChild = field.children;
      const children = isSingleSearch
        ? React.cloneElement(fieldChild as React.ReactElement, {
            allowClear: true,
            onPressEnter: () => {
              handleSearch();
            },
          })
        : fieldChild;

      const className = cls({
        [prefix + '-field-open']: isOpen,
        [prefix + '-field-over']: !isOpen && index > colLen - 2,
      });

      return (
        <FormItem
          key={getFormKey(field)}
          {...field}
          label={finalLabel}
          span={finalSpan}
          colClassName={className}
          children={children}
        />
      );
    });
  };

  // ===== 操作按钮 =====
  const actions: ButtonActionProps[] = [
    {
      children: '重置',
      ...resetActionProps,
      render: !isSingleSearch,
      onClick: handleReset,
    },
    {
      children: '查询',
      type: 'primary',
      ...queryActionProps,
      onClick: handleSearch,
    },
  ];

  // ===== 计算按钮偏移 =====
  const getActionOffset = useCallback(() => {
    const lastRowLen = fields?.length % colLen;
    if (!needCollapse) {
      return 24 - (fields.length + 1) * finalSpan;
    }

    if (isOpen) {
      return 24 - (lastRowLen + 1) * finalSpan;
    }

    return 0;
  }, [fields, isOpen, needCollapse, finalSpan]);

  if (!fields?.length) return <div />;

  return (
    <div
      className={cls({
        [prefix]: true,
        [prefix + '-divider']: showDivider,
      })}
    >
      <Form form={form} {...formProps}>
        <Row gutter={24}>
          {renderFields(fields)}
          <div>{isSingleSearch && <ButtonActions actions={actions} />}</div>
          {!isSingleSearch && (
            <Col className={prefix + '-actions'} span={finalSpan} offset={getActionOffset()}>
              <div>
                <ButtonActions actions={actions} />
                {needCollapse && (
                  <ToggleOpenButton
                    style={{ marginLeft: 8 }}
                    open={isOpen}
                    onClick={(open) => {
                      setIsOpen(!open);
                    }}
                  />
                )}
              </div>
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};
