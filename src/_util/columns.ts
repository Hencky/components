import type { ColumnType as AColumnsType } from 'antd/lib/table';

export function renderColumns<T>(columns, ctx, callback?): AColumnsType<T>[] {
  return columns
    .filter((column) => column.visible !== false)
    .map((column) => {
      const { children } = column;

      const finalRender = column?.render
        ? (value, record, index) => column.render!({ value, record, index, ...ctx })
        : undefined;

      return {
        dataIndex: column.key,
        ...column,
        children: children ? renderColumns(children, ctx, callback) : undefined,
        render: finalRender,
        ...(callback ? callback(column) : {}),
      };
    });
}
