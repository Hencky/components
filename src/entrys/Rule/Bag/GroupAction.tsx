import React from 'react';
import { type FormListOperation } from 'antd';
import { IconActions } from '@pms/ui';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

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
