import React from 'react';
import { ButtonActions } from '@pms/ui';
import { PlusOutlined } from '@ant-design/icons';
import type { FormListOperation } from 'antd/lib/form/FormList';

export interface LineActionProps {
  operation: FormListOperation;
}

export const LineAction: React.FC<LineActionProps> = (props) => {
  const { operation } = props;

  return (
    <ButtonActions
      actions={[
        {
          onClick: () => {
            operation.add({
              operation: '',
              variable: '',
              value: '',
            });
          },
          icon: <PlusOutlined />,
          children: '添加条件',
        },
        {
          onClick: () => {
            operation.add({
              type: 'or',
              children: [],
            });
          },
          icon: <PlusOutlined />,
          type: 'primary',
          children: '添加或组',
        },
        {
          onClick: () => {
            operation.add({
              type: 'and',
              children: [],
            });
          },
          icon: <PlusOutlined />,
          type: 'primary',
          children: '添加与组',
        },
      ]}
    />
  );
};
