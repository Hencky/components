import React, { useContext } from 'react';
import { Form, Space, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';
import { LineWrapper } from '../LineWrapper';
import { ButtonAction, IconAction } from '../Actions';
import { usePrefix } from '../_hooks';
import { RuleContext } from './context';

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

  const { name: ctxName, condition } = useContext(RuleContext);
  const prefix = usePrefix('rule-group');
  const form = useFormInstance();

  return (
    <List name={propName}>
      {(fields, operation) => {
        const renderFields = () => {
          return fields.map((field, index) => {
            const { key, name } = field;

            const values = form.getFieldValue(ctxName);
            const currentValue = get(values, [...path, name]);

            const isGroup = !!currentValue.type;

            if (!isGroup) {
              return (
                <Space key={field.key}>
                  {React.cloneElement(condition!, { field })}
                  <IconAction
                    onClick={() => {
                      operation.remove(index);
                    }}
                    icon={<DeleteOutlined />}
                    tooltip="删除"
                  />
                </Space>
              );
            }

            return (
              <Card key={key} className={prefix + '-card'}>
                <Space className={prefix + '-operator'}>
                  <IconAction
                    onClick={() => {
                      operation.add(
                        {
                          type: 'and',
                          children: [],
                        },
                        index + 1
                      );
                    }}
                    icon={<PlusOutlined />}
                    tooltip="下方添加组"
                  />
                  <IconAction
                    onClick={() => {
                      operation.remove(index);
                    }}
                    icon={<DeleteOutlined />}
                    tooltip="删除"
                  />
                </Space>
                <Group field={field} key={key} name={[name, 'children']} path={[...path, name, 'children']} />
              </Card>
            );
          });
        };

        const values = form.getFieldValue(ctxName);
        const titlePath = path.length ? path.slice(0, path.length - 1).concat('type') : path.concat([0, 'type']);
        const title = get(values, titlePath);

        return (
          <LineWrapper title={title} gutter={16}>
            {renderFields() as any}
            <Space>
              <ButtonAction
                onClick={() => {
                  operation.add({
                    operation: '',
                    variable: '',
                    value: '',
                  });
                }}
                icon={<PlusOutlined />}
              >
                添加条件
              </ButtonAction>
              <ButtonAction
                onClick={() => {
                  operation.add({
                    type: 'and',
                    children: [],
                  });
                }}
                icon={<PlusOutlined />}
                type="primary"
              >
                添加组
              </ButtonAction>
            </Space>
          </LineWrapper>
        );
      }}
    </List>
  );
};
