import React from 'react';
import { Tree } from '@pms/ui';

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
  return (
    <Tree
      searchProps={{
        placeholder: '请输入搜索名称',
      }}
      onSelect={(selectedKeys, e) => {
        console.log(selectedKeys, e);
      }}
      treeData={treeData}
      operatorRender={() => {
        return <div>操作按钮</div>;
      }}
    />
  );
};
