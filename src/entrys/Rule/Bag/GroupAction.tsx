import React from 'react';
import { IconActions } from '@lucky-bird/ui';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormListOperation } from 'antd/lib/form/FormList';

export interface GroupActionProps {
  operation: FormListOperation;
  index: number;
}

export const GroupAction: React.FC<GroupActionProps> = (props) => {
  const { operation, index } = props;

  return (
    <IconActions
      actions={[
        {
          onClick: () => {
            operation.add(
              {
                type: 'and',
                children: [],
              },
              index + 1
            );
          },
          icon: PlusOutlined,
          tooltip: '下方添加与组',
        },
        {
          onClick: () => {
            operation.remove(index);
          },
          icon: DeleteOutlined,
          tooltip: '删除组',
        },
      ]}
    />
  );
};
