import { FormInstance } from 'antd';
import React, { ReactChild, useEffect, useState } from 'react';

type PartialDependencyKey = 'visible' | 'options';

type DependencyValue = {
  defaultValue: any;
  condition: {
    formCondition: Record<string, any>;
    result: any;
  }[];
};

export type Dependency = Partial<Record<PartialDependencyKey, DependencyValue>>;

interface Props {
  deps?: Dependency;
  form?: FormInstance;
  children?: any;
}

const useDependency = ({ deps, form, children }: Props) => {
  const [returnValue, setReturnValue] = useState<any>({});

  const getResult = (deps?: Dependency) => {
    if (!deps) return;
    const res = { ...returnValue };

    for (let key in deps) {
      const { condition, defaultValue } = deps[key] as DependencyValue;
      condition.some((item) => {
        const { formCondition, result } = item;

        const isEqual = !Object.keys(formCondition).some((formConditionKey) => {
          let formResKey = formConditionKey.startsWith('[') ? JSON.parse(formConditionKey) : formConditionKey;
          // 判断相等 TODO: 考虑对象情况
          return form?.getFieldValue(formResKey) !== formCondition[formConditionKey];
        });

        res[key] = isEqual ? result : defaultValue;

        return isEqual;
      });
    }
    setReturnValue(res);
  };

  useEffect(() => {
    getResult(deps);
  }, [children]);

  return returnValue;
};

export default useDependency;
