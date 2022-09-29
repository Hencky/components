import React, { createContext } from 'react';
import type { NamePath } from 'antd/lib/form/interface';
import type { FormListFieldData } from 'antd/lib/form/FormList';

export interface IRuleContext {
  name: NamePath;
  condition?: React.ReactElement<{ field: FormListFieldData }>;
}

export const RuleContext = createContext<IRuleContext>({ name: '' });
