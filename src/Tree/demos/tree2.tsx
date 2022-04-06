import React from 'react';
import { Tree, ButtonAction, DropdownButton, IconAction } from '@pms/ui';
import { message } from 'antd';
import { PlusOutlined, CopyOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { DataNode, ButtonActionProps, TreeProps } from '@pms/ui';

const treeData = [
  {
    id: '0',
    title: '0',
    key: '0',
    children: [
      { id: '0-0', title: '0-0', key: '0-0' },
      { id: '0-1', title: '0-1', key: '0-1' },
      {
        id: '0-3',
        title: '0-2',
        key: '0-2',
        children: [{ id: '0-2-1', title: '0-2-0', key: '0-2-0' }],
      },
    ],
  },
  {
    id: '1',
    title: '1',
    key: '1',
    children: [
      { id: '1-0', title: '1-0', key: '1-0' },
      { id: '1-1', title: '1-1', key: '1-1' },
      {
        id: '1-2',
        title: '1-2',
        key: '1-2',
        children: [{ id: '1-2-1', title: '1-2-0', key: '1-2-0' }],
      },
    ],
  },
];

export default () => {
  const extraRender = () => {
    return (
      <ButtonAction
        tooltip="新建评价表"
        onClick={() => {
          message.success('新建成功');
        }}
        icon={<PlusOutlined />}
      />
    );
  };

  const operatorRender: TreeProps['operatorRender'] = (dataNode) => {
    const actions: ButtonActionProps[] = [
      {
        type: 'text',
        size: 'small',
        block: true,
        onClick: (e) => {
          e.stopPropagation();
          message.success('新建成功');
        },
        icon: <CopyOutlined />,
        children: '新建子集',
      },
      {
        children: '编辑',
        type: 'text',
        size: 'small',
        block: true,
        onClick: (e) => {
          e.stopPropagation();
          message.success('编辑成功');
        },
        icon: <EditOutlined />,
      },
      {
        children: '删除',
        confirm: '确认删除？',
        type: 'text',
        size: 'small',
        block: true,
        onClick: (e) => {
          e.stopPropagation();

          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 2000);
          });
        },
        icon: <DeleteOutlined />,
      },
    ];

    return (
      <DropdownButton actions={actions}>
        <IconAction icon={EllipsisOutlined} onClick={() => {}} />
      </DropdownButton>
    );
  };

  return (
    <Tree
      searchProps={{
        placeholder: '请输入搜索名称',
      }}
      onSelect={(selectedKeys, e) => {
        console.log(selectedKeys, e);
      }}
      treeData={treeData}
      operatorRender={operatorRender}
      extraRender={extraRender}
    />
  );
};
