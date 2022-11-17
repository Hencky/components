import React, { useContext } from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import { DefaultTitle } from '../../LineWrapper/Plugins';
import { RuleContext } from './context';
import { usePrefix } from '../../_hooks';

import './title.less';

const { useFormInstance } = Form;

const toogleType = {
  or: '或',
  and: '与',
};

export interface RultTitleProps {
  path: (string | number)[];
  refresh?: () => void;
}

export const RuleTitle: React.FC<RultTitleProps> = (props) => {
  const form = useFormInstance();
  const { name, disabled } = useContext(RuleContext);
  const { path, refresh } = props;
  const prefix = usePrefix('rule-title');

  const values = form.getFieldValue(name);
  const titlePath = [...path, 'type'];
  const title = get(values, titlePath);

  return (
    <DefaultTitle
      title={toogleType[title]}
      className={prefix}
      onClick={() => {
        if (disabled) return;
        form.setFieldValue([name, ...path.concat('type')], title === 'and' ? 'or' : 'and');
        refresh!();
      }}
    />
  );
};
