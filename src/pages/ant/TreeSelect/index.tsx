import { TreeSelect } from 'antd';
import React from 'react';
import { useState } from 'react';

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const TreeSelectDemo = () => {
  const [value, setValue] = useState(['0-0-0']);
  const [searchValue, setSearchValue] = useState(undefined);

  const onChange = (value: any) => {
    console.log('onChange ', value);
    setValue(value);
  };
  const onBlur = (value: any) => {
    console.log('onBlur', value);
    setSearchValue(undefined);
  };
  const tProps = {
    treeData,
    value: value,
    searchValue: searchValue,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    autoClearSearchValue: false,
    style: {
      width: '100%',
    },
    onBlur: onBlur,
  };
  return (
    <div style={{ width: '50%', margin: 16 }}>
      <span>可搜索的树选择器:</span>
      <TreeSelect {...tProps} />
    </div>
  );
};

export default TreeSelectDemo;
