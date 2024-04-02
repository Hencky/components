import { Form as AForm } from 'antd';
import { Form as IForm } from './Form';
import { FormGroup } from '../FormGroup';
import { FormItem } from '../FormItem';

type IFormType = typeof IForm;

interface FormType extends IFormType {
  FormGroup: typeof FormGroup;
  FormItem: typeof FormItem;
  List: typeof AForm.List;
  useForm: typeof AForm.useForm;
  useFormInstance: typeof AForm.useFormInstance;
  useWatch: typeof AForm.useWatch;
}

const Form = IForm as FormType;

Form.FormGroup = FormGroup;
Form.FormItem = FormItem;
Form.List = AForm.List;
Form.useForm = AForm.useForm;
Form.useFormInstance = AForm.useFormInstance;
Form.useWatch = AForm.useWatch;

export { Form };
