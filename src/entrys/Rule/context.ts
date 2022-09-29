import React, { createContext } from 'react';
import type { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';

export interface IRuleContext {
  name: string;
  condition?: React.ReactElement<{ field: FormListFieldData }>;
  lineAction?: React.ReactElement<{ operation: FormListOperation }>;
  groupAction?: React.ReactElement<{ operation: FormListOperation; index: number }>;
}

export const RuleContext = createContext<IRuleContext>({ name: '' });
