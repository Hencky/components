import React, { useState, useCallback, useRef, useEffect } from 'react';
import cls from 'classnames';
import { Tree as ATree, Input, Spin, Empty } from 'antd';
import { Text } from '../Text';
import { usePrefix } from '../_hooks';
import type { SearchProps } from 'antd/lib/input';
import type { TreeProps as ATreeProps, DataNode as ADataNode } from 'antd/lib/tree';

import './tree.less';

const { Search } = Input;

export interface DataNode extends Omit<ADataNode, 'title' | 'key' | 'children'> {
  title: string;
  key: string;
  children?: DataNode[];
  [key: string]: any;
}

export interface TreeProps extends ATreeProps<DataNode> {
  searchProps?: SearchProps;
  /** 显示搜索 */
  showSearch?: boolean;
  /** 加载状态 */
  loading?: boolean;
  /** 操作按钮渲染 */
  operatorRender?: (data: DataNode) => React.ReactElement;
  /** 鼠标划入时才显示操作按钮，默认true */
  showOperatorOnHover?: boolean;
  /** 额外的渲染组件 */
  extraRender?: () => React.ReactElement;
  /** 树节点样式 */
  treeNodeTitleStyle?: React.CSSProperties;
  /** 描述信息单行显示 */
  descriptionInLine?: boolean;
  /** 树节点hover时回调 */
  onTreeNodeHover?: (data: DataNode) => void;
}

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const dataList: DataNode[] = [];
const generateList = (data: DataNode[]) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title });
    if (node.children) {
      generateList(node.children);
    }
  }
};

export const Tree: React.FC<TreeProps> = (props) => {
  const {
    loading = false,
    searchProps,
    showSearch = true,
    treeData,
    operatorRender,
    showOperatorOnHover = true,
    extraRender,
    defaultExpandAll,
    treeNodeTitleStyle,
    descriptionInLine,
    onTreeNodeHover,
    ...restProps
  } = props;
  const [expandedKeys, setExpandedKeys] = useState<string[] | undefined>(undefined);
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  // 清空搜索条件后，默认展开所有
  const [treeKey, setTreeKey] = useState('1');
  const searchValueRef = useRef('');

  const prefix = usePrefix('tree');

  useEffect(() => {
    generateList(treeData!);
    return () => {
      dataList.length = 0;
    };
  }, [treeData]);

  const onSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const { value } = e.target;
      searchValueRef.current = value;

      const expKeys = dataList
        .map((item) => {
          if ((item.title as string).indexOf(value) > -1) {
            return getParentKey(item.key, treeData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);

      setExpandedKeys(expKeys);
      setAutoExpandParent(true);
      defaultExpandAll && setTreeKey(value?.length ? '2' : '1');
    },
    [treeData]
  );

  const onExpand: ATreeProps['onExpand'] = useCallback((keys) => {
    setAutoExpandParent(false);
    setExpandedKeys(keys as string[]);
  }, []);

  const titleRender = useCallback(
    (nodeData, searchValue) => {
      const { title: nodeTitle, description: nodeDesc } = nodeData;

      const index = nodeTitle.indexOf(searchValue);
      const beforeStr = nodeTitle.substring(0, index);
      const afterStr = nodeTitle.slice(index + searchValue.length);

      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className={prefix + '-treenode-highlight-text'}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{nodeTitle}</span>
        );

      if (operatorRender) {
        return (
          <div
            className={cls(prefix + '-treenode')}
            onMouseEnter={() => {
              onTreeNodeHover?.(nodeData);
            }}
          >
            <div
              className={cls(prefix + '-treenode-title', {
                [prefix + '-treenode-title-description-inline']: descriptionInLine,
              })}
              style={treeNodeTitleStyle}
            >
              <div>{title}</div>
              {nodeDesc ? <Text type="secondary">{nodeDesc}</Text> : null}
            </div>
            <div
              className={cls({
                [prefix + '-treenode-operator']: true,
                [prefix + '-treenode-operator-show']: !showOperatorOnHover,
                [prefix + '-treenode-operator-showonhover']: showOperatorOnHover,
              })}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {operatorRender(nodeData)}
            </div>
          </div>
        );
      }

      return title;
    },
    [operatorRender]
  );

  return (
    <Spin spinning={loading}>
      {showSearch && (
        <div className={prefix + '-search'}>
          <Search style={{ marginBottom: 8 }} onChange={onSearch} allowClear {...searchProps} />
          {extraRender && <div className={prefix + '-extra'}>{extraRender()}</div>}
        </div>
      )}
      {treeData?.length ? (
        <ATree
          key={treeKey}
          blockNode
          {...restProps}
          treeData={treeData}
          onExpand={onExpand}
          defaultExpandAll={defaultExpandAll}
          {...(defaultExpandAll && !searchValueRef.current ? {} : { expandedKeys })}
          autoExpandParent={autoExpandParent}
          titleRender={(nodeData) => {
            return titleRender(nodeData, searchValueRef.current);
          }}
        />
      ) : (
        <Empty />
      )}
    </Spin>
  );
};
