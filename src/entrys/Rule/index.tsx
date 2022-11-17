import React from 'react';
import { Group } from './Group';
import { RuleContext } from './context';
import type { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import type { NamePath } from 'antd/lib/form/interface';

export interface RuleProps {
  name: string;
  disabled?: boolean;
  condition: React.ReactElement<{ field?: FormListFieldData; path?: NamePath; disabled?: boolean }>;
  lineAction: React.ReactElement<{ operation: FormListOperation }>;
  groupAction: React.ReactElement<{ operation: FormListOperation; index: number }>;
}

export const Rule: React.FC<RuleProps> = (props) => {
  const { name, condition, lineAction, groupAction, disabled } = props;

  return (
    <RuleContext.Provider value={{ name, condition, lineAction, groupAction, disabled }}>
      <Group name={[name, 0, 'children']} path={[0]} />
    </RuleContext.Provider>
  );
};
