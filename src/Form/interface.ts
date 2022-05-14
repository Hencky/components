import type { FormItemProps } from './FormItem';

export type FormItemBaseProps = Pick<
  FormItemProps,
  'colon' | 'labelCol' | 'labelAlign' | 'wrapperCol' | 'hidden' | 'disabled'
>;
