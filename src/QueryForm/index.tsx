import React, { useState, useCallback } from 'react';
import { Form, Row, Col } from 'antd';
import cls from 'classnames';
import { type FormItemProps, FormItem } from '../Form';
import type { FormInstance, FormProps } from 'antd/lib/form';
import { ButtonActions, type ButtonActionProps } from '../Actions';
import { ToggleOpenButton } from '../ToggleOpenButton';
import { usePrefix } from '../_hooks';
import { getFormKey } from '../_util';

import './index.less';

export interface QueryFormProps extends Omit<FormProps, 'fields'> {
  fields: FormItemProps[];
  form?: FormInstance;
  showFieldsLength?: number;
  defaultExpand?: boolean;
  onSubmit: (values: any) => Promise<void> | undefined;
  onReset?: () => void;
}

export const QueryForm: React.FC<QueryFormProps> = (props) => {
  const prefix = usePrefix('queryform');

  const {
    fields,
    form = Form.useForm()[0],
    onReset,
    onSubmit,
    showFieldsLength = 3,
    defaultExpand = false,
    ...formProps
  } = props;

  const [isOpen, setIsOpen] = useState(defaultExpand);

  const colLen = showFieldsLength + 1;

  const needCollapse = fields.length > showFieldsLength;
  const isSingleSearch = fields.length === 1;

  // ===== 重置 =====
  const handleReset = useCallback(async () => {
    form.resetFields();
    return await onReset?.();
  }, [form, onReset]);

  // ===== 查询 =====
  const handleSearch = async () => {
    try {
      const values = await form.validateFields();
      return await onSubmit(values);
    } catch {
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
        ? // @ts-ignore
          React.cloneElement(fieldChild, {
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
      render: !isSingleSearch,
      onClick: handleReset,
    },
    {
      children: '查询',
      type: 'primary',
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

  return (
    <div className={prefix}>
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
