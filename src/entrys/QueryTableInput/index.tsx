import React, { useEffect, useRef } from 'react';
import { QueryTable, type QueryTableInstance, type QueryTableProps } from '../../QueryTable';

export interface QueryTableInputProps extends Omit<QueryTableProps, 'remoteDataSource' | 'rowKey'> {
  onChange?: (val?: string | string[]) => void;
  value?: string | string[];
  rowKey?: string;
  disabled?: boolean;
  rowSelectionType?: 'radio' | 'checkbox';
}

export const QueryTableInput: React.FC<QueryTableInputProps> = (props) => {
  const ref = useRef<QueryTableInstance>(null);

  const handleChangeRef = useRef(false);

  const { fields = [], rowKey = 'id', value, onChange, disabled, tableProps, rowSelectionType, ...restProps } = props;

  const isSingleMode = rowSelectionType === 'radio';

  useEffect(() => {
    if (handleChangeRef.current) return;
    if (isSingleMode) {
      ref.current?.table.setSelectedRows(value ? [value] : []);
    } else {
      ref.current?.table.setSelectedRows((value as string[]) || []);
    }
  }, [value, handleChangeRef.current, isSingleMode]);

  const handleSelect = (selectedRow) => {
    handleChangeRef.current = true;
    onChange?.(selectedRow);

    setTimeout(() => {
      handleChangeRef.current = false;
    });
  };

  return (
    <QueryTable
      {...restProps}
      tableProps={{
        ...tableProps,
        onRow: (record) => ({
          onClick: () => {
            let selectedRows;
            if (isSingleMode) {
              selectedRows = [record];
              ref.current?.table.setSelectedRows(selectedRows);
              handleSelect(selectedRows[0]);
            } else {
              selectedRows = [...(ref.current?.table.getSelectedRows() || [])];
              const index = selectedRows.findIndex((item) => item[rowKey] === record[rowKey]);
              if (index > -1) {
                selectedRows.splice(index, 1);
              } else {
                selectedRows.push(record);
              }
              ref.current?.table.setSelectedRows(selectedRows);
              handleSelect(selectedRows);
            }
          },
        }),
      }}
      rowKey={rowKey}
      fields={fields}
      ref={ref}
      rowSelection={{
        type: rowSelectionType,
        onSelect: (selectedRow, _, selectedRows) => {
          handleSelect(isSingleMode ? selectedRow : selectedRows);
        },
        hideSelectAll: true,
        getCheckboxProps: () => ({ disabled }),
      }}
    />
  );
};
