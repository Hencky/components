import { Form as AForm } from 'antd';
import { FormGroup } from './FormGroup';
import { FormItem } from './FormItem';

type IFormType = typeof AForm;

interface FormType extends IFormType {
  FormGroup: typeof FormGroup;
  FormItem: typeof FormItem;
}

const Form = AForm as FormType;

Form.FormGroup = FormGroup;
Form.FormItem = FormItem;

export { Form };
