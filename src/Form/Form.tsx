import { Form as AForm } from 'antd';
import { Form as IForm } from './IForm';
import { FormGroup } from './FormGroup';
import { FormItem } from './FormItem';

type IFormType = typeof IForm;

interface FormType extends IFormType {
  FormGroup: typeof FormGroup;
  FormItem: typeof FormItem;
  useForm: typeof AForm.useForm;
}

const Form = IForm as FormType;

Form.FormGroup = FormGroup;
Form.FormItem = FormItem;
Form.useForm = AForm.useForm;

export { Form };
