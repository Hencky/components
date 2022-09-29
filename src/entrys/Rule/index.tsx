import React from 'react';
import { Group } from './Group';
import { RuleContext } from './context';
import type { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';

export interface RuleProps {
  name: string;
  condition: React.ReactElement<{ field: FormListFieldData }>;
  lineAction: React.ReactElement<{ operation: FormListOperation }>;
  groupAction: React.ReactElement<{ operation: FormListOperation; index: number }>;
}

export const Rule: React.FC<RuleProps> = (props) => {
  const { name, condition, lineAction, groupAction } = props;

  return (
    <RuleContext.Provider value={{ name, condition, lineAction, groupAction }}>
      <Group name={[name, 0, 'children']} path={[0]} />
    </RuleContext.Provider>
  );
};
