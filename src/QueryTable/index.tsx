import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  type PropsWithChildren,
  type ReactElement,
  type ForwardedRef,
} from 'react';
import cls from 'classnames';
import { Form } from 'antd';
import { QueryForm, type QueryFormProps } from '../QueryForm';
import { Table, type TableProps, type TableInstance, type ColumnType } from '../Table';
import { ButtonActions, type ButtonActionProps } from '../Actions';
import { ModalForm, type ModalFormInstance } from '../ModalForm';
import type { FormInstance } from 'antd/lib/form';
import { usePrefix } from '../_hooks';

import './index.less';

export interface QueryTableInstance<RecordType = any> {
  form: FormInstance;
  table: TableInstance<RecordType>;
  modal: ModalFormInstance;
}

export type QueryTableContext<RecordType = any> = QueryTableInstance<RecordType>;

type OutsideTableType = 'remoteDataSource' | 'columns' | 'rowKey' | 'rowSelection';

export interface QueryTableActions<RecordType = any> extends Omit<ButtonActionProps, 'onClick'> {
  onClick: (e: React.MouseEvent<HTMLButtonElement>, ctx: QueryTableContext<RecordType>) => void;
}

export type QueryTableColumnRenderContext<RecordType = any> = {
  value: RecordType;
  index: number;
  record: RecordType;
} & QueryTableContext<RecordType>;

export interface QueryTableColumnType<RecordType> extends Omit<ColumnType<RecordType>, 'render'> {
  render?: (ctx: QueryTableColumnRenderContext) => ReactElement;
}

export interface QueryTableProps<RecordType extends Record<string, any> = any>
  extends Pick<QueryFormProps, 'fields' | 'initialValues' | 'showFieldsLength'>,
    Pick<TableProps, Exclude<OutsideTableType, 'columns'>> {
  columns: QueryTableColumnType<RecordType>[];
  tableProps?: Omit<TableProps<RecordType>, OutsideTableType>;
  leftActions?: QueryTableActions<RecordType>[];
  actions?: QueryTableActions<RecordType>[];
  formProps?: Omit<QueryFormProps, 'fields' | 'initialValues' | 'showFieldsLength'>;
}

function BaseQueryTable<RecordType extends Record<string, any> = any>(
  props: QueryTableProps<RecordType>,
  ref: ForwardedRef<QueryTableInstance<RecordType>>
) {
  const prefix = usePrefix('querytable');
  const {
    fields,
    initialValues,
    showFieldsLength = 3,
    rowKey,
    columns,
    rowSelection,
    remoteDataSource,
    tableProps = {},
    formProps = {},
    leftActions,
    actions,
  } = props;

  const [form] = Form.useForm();
  const [, update] = useState({});

  const tableRef = useRef<TableInstance>(null);
  const modalRef = useRef<ModalFormInstance>(null);

  // ===== ?????????????????????action?????? =====
  const forceUpdate = () => {
    update({});
  };

  // ===== ???????????????????????????????????? ======
  const onSubmit = (values) => {
    const currentPagination = tableRef.current!.getPagination();
    tableRef.current!.setPagination({ ...currentPagination, current: 1 });
    return tableRef.current!.refresh(values);
  };

  // ===== ?????? =====
  const onReset = () => {
    return tableRef.current!.reset();
  };

  const getQueryTableInstance = () => ({
    form,
    table: tableRef.current!,
    modal: modalRef.current!,
  });

  useImperativeHandle(ref, getQueryTableInstance);

  // ===== ??????columns???render??????form???table???????????????dataIndex?????? =====
  // TODO: ????????????children??????
  const renderColumns = (): ColumnType<RecordType>[] => {
    return columns.map((column) => {
      const finalRender = column.render
        ? ({ value, record, index }) => {
            return column.render!({ value, record, index, ...getQueryTableInstance() });
          }
        : undefined;
      return {
        ...column,
        render: finalRender,
      };
    });
  };

  // ===== ???????????????????????????onClick?????????form???table?????? =====
  // TODO: ???????????????ButtonAction??????????????????????????????actionType??????????????????
  const renderActions = () => {
    const getActions = (actions: QueryTableActions[] = []): ButtonActionProps[] => {
      return actions?.map((item) => {
        return {
          ...item,
          onClick: (e) => {
            return item.onClick(e, getQueryTableInstance());
          },
        };
      });
    };

    const leftAcionRender = <ButtonActions actions={getActions(leftActions)} />;
    const rightActionRender = <ButtonActions actions={getActions(actions)} />;

    return (
      <div
        className={cls({
          [prefix + '-actions']: true,
          [prefix + '-actions-empty']: !leftActions && !actions,
        })}
      >
        <div>{leftAcionRender}</div>
        <div>{rightActionRender}</div>
      </div>
    );
  };

  const finalRowSelection = rowSelection
    ? {
        ...(typeof rowSelection === 'boolean' ? {} : rowSelection),
        onChange: forceUpdate,
      }
    : undefined;

  return (
    <div className={prefix}>
      {!!showFieldsLength && (
        <QueryForm
          form={form}
          fields={fields}
          onReset={onReset}
          onSubmit={onSubmit}
          {...formProps}
          showFieldsLength={showFieldsLength}
          initialValues={initialValues}
        />
      )}

      {renderActions()}

      <Table
        ref={tableRef}
        rowKey={rowKey}
        columns={renderColumns()}
        rowSelection={finalRowSelection}
        remoteDataSource={remoteDataSource}
        {...tableProps}
      />

      <ModalForm ref={modalRef} />
    </div>
  );
}

export const QueryTable = forwardRef<QueryTableInstance, QueryTableProps>(BaseQueryTable) as <RecordType = any>(
  props: PropsWithChildren<QueryTableProps<RecordType>> & { ref?: React.Ref<QueryTableInstance<RecordType>> }
) => ReactElement;
