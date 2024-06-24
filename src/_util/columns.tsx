import { Space } from 'antd';
import { IconAction } from '../Actions';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { ColumnType as AColumnsType } from 'antd/lib/table';

export function renderColumns<T>(columns, ctx, callback?): AColumnsType<T>[] {
  return columns
    .filter((column) => column.visible !== false)
    .map((column) => {
      const { children, title, tooltip } = column;

      const finalRender = column?.render
        ? (value, record, index) => column.render!({ value, record, index, ...ctx })
        : undefined;

      return {
        dataIndex: column.key,
        ...column,
        children: children ? renderColumns(children, ctx, callback) : undefined,
        render: finalRender,
        title: tooltip ? (
          <Space>
            <div>{title}</div>
            <div>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <IconAction icon={<InfoCircleOutlined />} onClick={() => {}} tooltip={tooltip} />
            </div>
          </Space>
        ) : (
          title
        ),
        ...(callback ? callback(column) : {}),
      };
    });
}
