import React from 'react';
import { Group } from './Group';
import { RuleContext } from './context';
import type { NamePath } from 'antd/lib/form/interface';

export interface RuleProps {
  name: NamePath;
  condition: React.ReactElement;
}

export const Rule: React.FC<RuleProps> = (props) => {
  const { name, condition } = props;

  return (
    <RuleContext.Provider value={{ name, condition }}>
      <Group name={name} path={[]} />
    </RuleContext.Provider>
  );
};
