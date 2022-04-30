import type { FormLabelAlign } from 'antd/lib/form/interface';
import type { ColProps } from 'antd/lib/col';

export interface FormItemBaseProps {
  /** group中的FormItem是否有冒号 */
  colon?: boolean;
  /** label标签布局 */
  labelCol?: ColProps;
  /** label标签的文本对齐方式 */
  labelAlign?: FormLabelAlign;
  /** 为输入控件设置布局样式 */
  wrapperCol?: ColProps;
  /** 隐藏字段（依然会手机和校验字段） */
  hidden?: boolean;
}
