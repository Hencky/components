import React from 'react';
import { FormItem, type FormItemProps } from '../../FormItem';

export interface EditableTableCellProps {
  editing: boolean;
  index: number;
  name: string;
  editNode?: React.ReactNode;
  formItemProps?: FormItemProps;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = (props) => {
  const { editing, children, name, editNode, formItemProps, ...restProps } = props;

  return (
    <td {...restProps}>
      {editing && editNode ? (
        <FormItem name={name} style={{ marginBottom: 0 }} {...formItemProps}>
          {editNode}
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};
