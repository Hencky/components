import React, { createContext } from 'react';
import type { FormListFieldData, FormListOperation } from 'antd/lib/form/FormList';
import type { NamePath } from 'antd/lib/form/interface';

export interface IRuleContext {
  name: string;
  disabled?: boolean;
  condition?: React.ReactElement<{ field?: FormListFieldData; path?: NamePath; disabled?: boolean }>;
  lineAction?: React.ReactElement<{ operation: FormListOperation }>;
  groupAction?: React.ReactElement<{ operation: FormListOperation; index: number }>;
}

export const RuleContext = createContext<IRuleContext>({ name: '' });
