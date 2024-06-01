import type { FormInstance } from 'antd/lib/form';
import { type TableInstance } from '../Table';
import { type ModalFormInstance } from '../ModalForm';

export interface QueryTableInstance<RecordType = any, Values = any> {
  form: FormInstance<Values>;
  table: TableInstance<RecordType>;
  modal: ModalFormInstance;
  tableRef: { current: TableInstance<RecordType> | null };
}
