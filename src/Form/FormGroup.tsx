import React from 'react';
import { Row } from 'antd';
import { toArray } from '../_util/array';
import { FormItem } from './FormItem';
import { FormItemProps } from './FormItem';

const renderField = (props: FormItemProps & { key: string | number }) => {
  return <FormItem {...props} />;
};

export type FormGroupItemProps = FormItemProps & { fields?: FormGroupItemProps[]; name: string };

export interface FormGroupProps {
  fields: FormGroupItemProps[];
  name?: string;
  container?: React.ReactElement;
  style?: React.CSSProperties;
}

// export const FormGroup: React.FC<FormGroupProps> = (props) => {
//   const { fields, style, container } = props;

//   const renderFields = (fields: FormGroupItemProps[]) => {
//     return fields.map((item) => {
//       const { fields, ...rest } = item;

//       const key = toArray(item.name).join('-');

//       if (item.fields) {
//         if (item.container) {
//           return React.cloneElement(item.container, null, <FormGroup key={key} {...rest} fields={fields} container={null} />);
//         }
//         return <FormGroup key={key} {...rest} fields={fields} />;
//       }

//       return renderField({
//         key,
//         ...item,
//       });
//     });
//   };

//   const ele = renderFields(fields);

//   if (container) {
//     return React.cloneElement(container, null, ele);
//   }

//   return <Row style={style}>{ele}</Row>;
// };

export const FormGroup: React.FC<FormGroupProps> = (props) => {
  const { name, container, fields } = props;

  const renderFields = (fields) => {
    return fields.map((item) => {

      if (item.fields) {
        return <FormGroup key={item.name} {...item} />
      }

      return <FormItem key={toArray(item.name).join('-')} {...item} />;
    });
  };

  const ele = renderFields(fields);

  if (container) {
    return React.cloneElement(container, null, <Row>{ele}</Row>);
  }

  return <Row>{ele}</Row>;
};

FormGroup.defaultProps = {};
