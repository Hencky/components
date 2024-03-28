import { toArray } from './array';
import type { FormItemProps } from '../FormItem';

export function getFormKey(field: FormItemProps): string;
export function getFormKey(name: FormItemProps['name']): string;
export function getFormKey(name: any): any {
  if (!name) return;

  if (typeof name === 'string' || Array.isArray(name)) {
    return toArray(name).join('-');
  }
  return getFormKey(name.name);
}
