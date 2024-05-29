import { RequiredTitle } from '../../RequiredTitle';
import { renderColumns } from '../../_util';

export const getColumns = (columns, options) => {
  const { rowKey, editingKey, disabled } = options;
  const isEditing = (record) => record[rowKey] === editingKey;

  const mergedColumns = renderColumns(columns, {}, (column) => {
    const { editFormItemProps: { rules = [] } = {} } = column;
    const required = rules.find((rule) => rule.required);

    return {
      title: required && !disabled ? <RequiredTitle>{column.title}</RequiredTitle> : column.title,
      onCell: (record, index) => ({
        record,
        title: column.title,
        name: column.key,
        formItemProps: column.editFormItemProps,
        editing: isEditing(record),
        editable: column.editable ? column.editable(record) : undefined,
        renderEditNode: column.renderEditNode ? (form) => column.renderEditNode!({ record, index, form }) : undefined,
        ...column.onCell?.(record, index),
      }),
    };
  });

  return mergedColumns;
};
