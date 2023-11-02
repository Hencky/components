import { Form, FormItemProps } from 'antd';
import { isEqual as isEqualFromLodash } from 'lodash';
import React from 'react';

type PartialDependencyKey = 'visible' | 'options';

type DependencyValue = {
  defaultValue: any;
  condition: ConditionItem[];
};

export type ConditionItem = {
  formCondition: Record<string, any>[];
  result: DependencyValue['defaultValue'];
};

export type CustomDependencies = Partial<Record<PartialDependencyKey, DependencyValue>>;

export interface UseDependencyProps {
  customDependencies?: CustomDependencies;
}

// 获取数组item的类型
type ElementType<T> = T extends (infer U)[] ? U : never;

export const getDependenciesFromCondition = (
  customDependencies?: CustomDependencies
): Required<FormItemProps>['dependencies'] => {
  const resDepsSet = new Set<ElementType<Required<FormItemProps>['dependencies']>>();

  if (!customDependencies) return Array.from(resDepsSet);

  Object.keys(customDependencies).forEach((customKey) => {
    const { defaultValue = '', condition = [] } = customDependencies[customKey as PartialDependencyKey] || {};
    condition.forEach((conditionItem) => {
      const { formCondition, result } = conditionItem;
      formCondition.forEach((formConditionItem) => {
        Object.keys(formConditionItem).forEach((formConditionItemKey) => {
          resDepsSet.add(formConditionItemKey);
        });
      });
    });
  });

  return Array.from(resDepsSet);
};

export const useDependency = ({
  customDependencies,
}: UseDependencyProps): Partial<Record<PartialDependencyKey, DependencyValue['defaultValue']>> => {
  const form = Form.useFormInstance();

  const getConditionResByKey = (
    customKey: PartialDependencyKey,
    condition: ConditionItem[],
    defaultValue: DependencyValue['defaultValue']
  ) => {
    for (let conditionI = 0; conditionI < condition.length; conditionI++) {
      let isEqual = false;
      const { formCondition, result } = condition[conditionI];
      for (let formConditionI = 0; formConditionI < formCondition.length; formConditionI++) {
        const formConditionItem = formCondition[formConditionI];
        // formConditionItem { sex: 'male', address: 'beijing' }
        const formConditionKeys = Object.keys(formConditionItem);
        for (let formConditionKeysI = 0; formConditionKeysI < formConditionKeys.length; formConditionKeysI++) {
          // const formValue = form.getFieldValue();
          const formKey = formConditionKeys[formConditionKeysI];
          let finalFormKey = formKey.startsWith('[') ? JSON.parse(formKey) : formKey;

          isEqual = isEqualFromLodash(form?.getFieldValue(finalFormKey), formConditionItem[finalFormKey]);

          if (!isEqual) {
            break;
          }
        }

        if (isEqual) {
          return { [customKey]: result };
        }
      }
    }
    return {
      [customKey]: defaultValue,
    };
  };

  const getResult = (customDependencies?: CustomDependencies) => {
    const res = {};

    if (!customDependencies) return res;

    const customKeys = Object.keys(customDependencies);

    for (let customKeysI = 0; customKeysI < customKeys.length; customKeysI++) {
      const customKey = customKeys[customKeysI] as PartialDependencyKey;

      const { defaultValue = '', condition = [] } = customDependencies[customKey as PartialDependencyKey] || {};

      const conditionRes = getConditionResByKey(customKey, condition, defaultValue);
      Object.assign(res, conditionRes);
    }

    return res;
  };

  const returnValue = getResult(customDependencies);

  return returnValue;
};
