import React from 'react';
import { FormItem, type FormItemProps } from '../../FormItem';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';

const { useFormInstance } = Form;
export interface EditableTableCellProps {
  editing: boolean;
  index: number;
  name: string;
  renderEditNode?: (form: FormInstance) => React.ReactNode;
  formItemProps?: FormItemProps;
  title: React.ReactNode;
  editable?: boolean;
}

export const EditableTableCell: React.FC<EditableTableCellProps> = (props) => {
  const { editing, children, name, renderEditNode, formItemProps, editable = true, title, ...restProps } = props;

  const form = useFormInstance();

  return (
    <td {...restProps}>
      {editing && renderEditNode && editable ? (
        <FormItem name={name} style={{ marginBottom: 0 }} {...formItemProps}>
          {renderEditNode(form)}
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};
