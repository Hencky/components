import React, { useContext, useState } from 'react';
import { Form, Space, Card } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { LineWrapper } from '../../LineWrapper';
import { IconAction } from '../../Actions';
import { RuleTitle } from './Title';
import { RuleContext } from './context';
import { usePrefix } from '../../_hooks';

import type { NamePath } from 'antd/lib/form/interface';
import type { FormListFieldData } from 'antd/lib/form/FormList';

import './group.less';

const { List, useFormInstance } = Form;

export interface GroupProps {
  name: NamePath;
  field?: FormListFieldData;
  path?: (string | number)[];
}

export const Group: React.FC<GroupProps> = (props) => {
  const { name: propName, path = [] } = props;

  const { name: ctxName, condition, lineAction, groupAction } = useContext(RuleContext);
  const prefix = usePrefix('rule-group');
  const form = useFormInstance();
  const [, update] = useState({});

  const forceUpdate = () => update({});

  return (
    <List name={propName}>
      {(fields, operation) => {
        const renderFields = () => {
          return fields.map((field, index) => {
            const { key, name } = field;

            const values = form.getFieldValue(ctxName);
            const currentPath = [...path, 'children', index];
            const currentValue = get(values, currentPath, {});
            const isGroup = !!currentValue.type;

            if (!isGroup) {
              return (
                <Space key={field.key}>
                  {React.cloneElement(condition!, { field })}
                  <IconAction
                    onClick={() => {
                      operation.remove(index);
                    }}
                    icon={<MinusCircleOutlined />}
                    tooltip="删除行"
                  />
                </Space>
              );
            }

            return (
              <Card key={key} className={prefix + '-card'}>
                <div className={prefix + '-operator'}>
                  {groupAction ? React.cloneElement(groupAction, { operation, index }) : null}
                </div>
                <Group field={field} key={key} name={[name, 'children']} path={currentPath} />
              </Card>
            );
          });
        };

        const values = form.getFieldValue(ctxName);
        const titlePath = [...path, 'type'];
        const title = get(values, titlePath);

        return (
          <LineWrapper title={title} gutter={16} titleRender={() => <RuleTitle path={path} refresh={forceUpdate} />}>
            {renderFields() as any}
            {lineAction ? React.cloneElement(lineAction, { operation }) : null}
          </LineWrapper>
        );
      }}
    </List>
  );
};
