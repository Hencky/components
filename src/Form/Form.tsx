import { FormProps as AFormProps } from 'antd/lib/form';
import { Form as IForm } from './IForm';
import { FormGroup } from './FormGroup';
import { FormItem } from './FormItem';

type IFormType = typeof IForm;

interface FormType extends IFormType {
  FormGroup: typeof FormGroup;
  FormItem: typeof FormItem;
}

const Form = IForm as FormType;

Form.FormGroup = FormGroup;
Form.FormItem = FormItem;

export { Form };
