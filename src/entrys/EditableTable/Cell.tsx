import React from 'react';
import { FormItem, type FormItemProps } from '../../FormItem';

export interface EditableTableCellProps {
  editing: boolean;
  index: number;
  name: string;
  editRender?: () => React.ReactNode;
  formProps?: FormItemProps;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = (props) => {
  const { editing, children, name, editRender, formProps, ...restProps } = props;

  return (
    <td {...restProps}>
      {editing && editRender ? (
        <FormItem name={name} style={{ marginBottom: 0 }} {...formProps}>
          {editRender()}
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};
