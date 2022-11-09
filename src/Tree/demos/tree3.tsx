import React from 'react';
import { Tree } from 'lucky-bird-ui';

const treeData = [
  {
    id: '0',
    title: '0',
    key: '0',
    description: 'aaa',
    children: [
      { id: '0-0', title: '0-0', key: '0-0', description: 'aaa' },
      { id: '0-1', title: '0-1', key: '0-1', description: 'aaa' },
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

const Demo = () => {
  return (
    <Tree
      searchProps={{
        placeholder: '请输入搜索名称 tree3',
      }}
      onSelect={(selectedKeys, e) => {
        console.log(selectedKeys, e);
      }}
      defaultExpandAll={true}
      treeData={treeData}
      operatorRender={() => {
        return <div>操作按钮</div>;
      }}
    />
  );
};

export default Demo;
