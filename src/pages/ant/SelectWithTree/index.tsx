import React, { useState } from 'react';
import { Select, Tree } from 'antd';
import { treeData } from './data';
import { map, remove, uniq } from 'lodash';
import './index.less';
const { Option } = Select;
// const treeData = [
//   {
//     title: '0-0',
//     key: '0-0',
//     level: 1,
//     children: [
//       {
//         title: '0-0-0',
//         key: '0-0-0',
//         level: 2,
//         children: [
//           {
//             title: '0-0-0-0',
//             key: '0-0-0-0',
//             level: 3,
//             children: [
//               { title: '0-0-0-0-1', key: '0-0-0-0-1', level: 4 },
//               { title: '0-0-0-1-2', key: '0-0-0-1-2', level: 4 },
//               { title: '0-0-0-2-3', key: '0-0-0-2-3', level: 4 },
//             ],
//           },
//           { title: '0-0-0-1', key: '0-0-0-1', level: 2 },
//           { title: '0-0-0-2', key: '0-0-0-2', level: 2 },
//         ],
//       },
//       {
//         title: '0-0-1',
//         key: '0-0-1',
//         level: 2,
//         children: [
//           { title: '0-0-1-0', key: '0-0-1-0', level: 3 },
//           { title: '0-0-1-1', key: '0-0-1-1', level: 3 },
//           { title: '0-0-1-2', key: '0-0-1-2', level: 3 },
//         ],
//       },
//       {
//         title: '0-0-2',
//         key: '0-0-2',
//         level: 2,
//       },
//     ],
//   },
//   {
//     title: '0-1',
//     key: '0-1',
//     level: 1,
//     children: [
//       { title: '0-1-0-0', key: '0-1-0-0' },
//       { title: '0-1-0-1', key: '0-1-0-1' },
//       { title: '0-1-0-2', key: '0-1-0-2' },
//     ],
//   },
//   {
//     title: '0-2',
//     key: '0-2',
//     level: 1,
//   },
// ];

const defaultChecked: any[] = [];

/**
 * 树点击
 * 1、level<2节点不可点击
 * 2、点击level===2 的节点时，select框只保存level2节点，树中勾选所有子节点
 * 3、disabled的节点不能选中
 * 4、点击level，3，4等节点时保存所有子节点
 * 5、点击父节点后勾选所有子节点，但是只回显
 * 6、选中所有子节点后勾选可选中的父节点
 *
 * 3，4都是旧逻辑
 * 旧的业务逻辑不动
 * 4、对于all_开头的节点，选中父节点和父节点下所有子节点，select框只传父节点id
 * 5、取消节点时，同级all_开头的节点进行移除
 * 6、取消all_节点时，移除父节点，同时select框传入该父节点下的其他子节点
 *
 * select点击
 * 移除对应树选中内容，处理树的父子级关系
 *
 */

const addKey = (arr: any) => {
  arr.forEach((child: any) => {
    child.key = child.value;
    if (child.children && child.children.length > 0) {
      addKey(child.children);
    }
  });
};
addKey(treeData);
const treeMap = new Map();
const level2Node = new Map();
const treeToMap = (arr: any) => {
  arr.forEach((child: any) => {
    if (!treeMap.has(child.key)) {
      treeMap.set(child.key, child);
      if (child.absolute_level === 2 || child.ky_type_level === 2) {
        level2Node.set(child.key, child);
      }
      if (child.children && child.children.length > 0) {
        treeToMap(child.children);
      }
    }
  });
};
treeToMap(treeData);

const SelectWithTree = () => {
  const [items, setItems] = useState<any[]>(defaultChecked);

  const [expandedKeys, setExpandedKeys] = useState<any[]>(defaultChecked);
  const [checkedKeys, setCheckedKeys] = useState<any[]>([]);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // 树节点选中时添加子节点
  const addTreeSelectValues = (list: any, arr: any) => {
    list.forEach((child: any) => {
      arr.push(child.key);
      if (child.children && child.children.length > 0) {
        addTreeSelectValues(child.children, arr);
      }
    });
  };

  // 树节点移除时移除子节点
  const removeTreeSelect = (list: any, arr: any) => {
    list.forEach((child: any) => {
      remove(arr, (item) => item === child.key);
      if (child.children && child.children.length > 0) {
        removeTreeSelect(child.children, arr);
      }
    });
  };

  //select移除时移除子节点
  const removeSelect = (list: any, arr: any) => {
    list.forEach((child: any) => {
      remove(arr, (item: any) => item.key === child.key);
      if (child.children && child.children.length > 0) {
        removeSelect(child.children, arr);
      }
    });
  };

  // 获取当前节点的所有父节点
  const getAllParentsKeys = (key: any, keys: any[]) => {
    keys.push(key);
    const pNode = treeMap.get(key);
    console.log(pNode);
    if (pNode.parent_dept_code && (pNode.absolute_level > 2 || pNode.ky_type_level > 2)) {
      getAllParentsKeys(pNode.parent_dept_code, keys);
    }
  };

  // 获取所有半选节点
  const getHalfCheckedKeys = (key: any, keys: any[]) => {
    // 已存在该半选节点
    if (keys.includes(key)) {
      return;
    }
    const node = treeMap.get(key);
    if (!node) {
      return;
    }
    if (node.absolute_level <= 2 || node.ky_type_level <= 2) {
      return;
    }
    keys.push(key);
    if (node.parent_dept_code) {
      getAllParentsKeys(node.parent_dept_code, keys);
    }
  };
  // 获取node一层子节点key数组
  const getNodeChildrenKeys = (node: any) => {
    const keys: any[] = [];
    if (node.children && node.children.length > 0) {
      node.children.forEach((child: any) => {
        keys.push(child.key);
      });
    }
    return keys;
  };

  // 树勾选处理
  const onCheck = (checked: any, info: any) => {
    console.log('onCheck', checked, info, info.checked, info.node.key);

    const node = info.node;
    const nodeKey = node.key;
    const parentNodeKey = info.node.parent_dept_code;
    // 标记父节点是否因为子节点而进行勾选
    let parentNodeShouldSelect = false;
    let parentNode: any = {};
    let parentChildrenKeys: any = [];
    if (parentNodeKey) {
      parentNode = treeMap.get(parentNodeKey);
      parentChildrenKeys = getNodeChildrenKeys(parentNode);
    }

    const lastSelectTreeValues: any[] = [...checkedKeys];
    let selectTreeValues: any[] = [];

    let halfSelectTreeValues: any[] = [];

    // 处理树展示逻辑
    if (info.checked) {
      if (parentNodeKey && !parentNode.disabled) {
        // 先判断添加该节点后是否要勾选父节点
        const currentSelectKeys = lastSelectTreeValues.concat([nodeKey]).filter((key) => {
          // all_开头的特殊处理
          if (key.includes('all_')) {
            parentChildrenKeys.includes(key.substring(4));
          }
          return parentChildrenKeys.includes(key);
        });
        // 父节点下的子节点已经全选
        if (currentSelectKeys.length === parentChildrenKeys.length) {
          parentNodeShouldSelect = true;
          selectTreeValues.push(parentNodeKey);
        }
      }
      // 带all节点特殊处理
      if (nodeKey.includes(`all_`) && parentNodeKey) {
        selectTreeValues.push(parentNodeKey);
        if (parentNode.children && parentNode.children.length > 0) {
          addTreeSelectValues(parentNode.children, selectTreeValues);
        }
      } else {
        selectTreeValues.push(nodeKey);
        if (node.children && node.children.length > 0) {
          addTreeSelectValues(node.children, selectTreeValues);
        }
      }

      selectTreeValues = uniq(selectTreeValues.concat(lastSelectTreeValues));
    } else {
      // 先判断移除该节点后父节点是否要移除
      if (parentNodeKey && lastSelectTreeValues.includes(parentNodeKey)) {
        remove(lastSelectTreeValues, (key) => key === parentNodeKey);
        // 如果有all节点，也一起移除
        remove(lastSelectTreeValues, (key) => key === `all_${parentNodeKey}`);
      }
      remove(lastSelectTreeValues, (item) => item === nodeKey);
      if (node.children && node.children.length > 0) {
        removeTreeSelect(node.children, lastSelectTreeValues);
      }
      selectTreeValues = lastSelectTreeValues;
    }

    // 半选处理
    selectTreeValues.forEach((item) => {
      getHalfCheckedKeys(item, halfSelectTreeValues);
    });
    setHalfCheckedKeys(halfSelectTreeValues);

    console.log('selectTreeValues', selectTreeValues);
    setCheckedKeys(selectTreeValues);

    // 处理select展示逻辑
    const currentSelectTreeValues = [...selectTreeValues];
    let inputSelectValues: any = [];
    if (info.checked) {
      // 同时存在节点和all_节点，则移除该节点，保留all_节点
      if (nodeKey.includes('all_')) {
        remove(currentSelectTreeValues, (item) => item === parentNodeKey);
      }
      if (
        currentSelectTreeValues.includes(nodeKey) &&
        currentSelectTreeValues.includes(`all_${nodeKey}`)
      ) {
        remove(currentSelectTreeValues, (item) => item === nodeKey);
      }
      // 全部重新赋值
      currentSelectTreeValues.forEach((item) => {
        inputSelectValues.push({
          key: item,
          label: treeMap.get(item).title,
        });
      });
    } else {
      // 同时存在节点和all_节点，则移除该节点，保留all_节点
      if (
        currentSelectTreeValues.includes(nodeKey) &&
        currentSelectTreeValues.includes(`all_${nodeKey}`)
      ) {
        remove(currentSelectTreeValues, (item) => item === nodeKey);
      }
      // 全部重新赋值
      currentSelectTreeValues.forEach((item) => {
        inputSelectValues.push({
          key: item,
          label: treeMap.get(item).title,
        });
      });
    }
    // 存在已选的二级节点则移除该二级节点下对应的子节点
    const validInputSelectValues = [...inputSelectValues];
    inputSelectValues.forEach((item: any) => {
      if (level2Node.has(item.key)) {
        removeSelect(level2Node.get(item.key).children, validInputSelectValues);
      }
    });

    console.log('inputSelectValues', validInputSelectValues);
    setItems(validInputSelectValues);
  };

  const onSelect = (selectedKeysValue: any, info: any) => {
    console.log('onSelect', selectedKeysValue, info, info.selected, info.selectedNodes);
    // setSelectedKeys(selectedKeysValue);
  };

  const onSelectChange = (value: any, option: any) => {
    console.log('onSelectChange', value, option);
  };

  const onDeselect = (value: any) => {
    const selectTreeValues = [...checkedKeys];
    console.log('onDeselect', value, selectTreeValues);

    const node = treeMap.get(value.key);

    remove(selectTreeValues, (item) => item === value.key);
    if (node.children && node.children.length > 0) {
      removeTreeSelect(node.children, selectTreeValues);
    }

    setCheckedKeys(selectTreeValues);

    const halfSelectTreeValues: any = [];
    // 半选处理
    selectTreeValues.forEach((item) => {
      getHalfCheckedKeys(item, halfSelectTreeValues);
    });
    setHalfCheckedKeys(halfSelectTreeValues);

    const inputSelectValues: any[] = [];
    selectTreeValues.forEach((item) => {
      inputSelectValues.push({
        key: item,
        label: treeMap.get(item).title,
      });
    });
    console.log('inputSelectValues', inputSelectValues);
    setItems(inputSelectValues);
    // parent_dept_code
    // setItems(arr);
    // setCheckedKeys(arr);
  };
  return (
    <Select
      className="selectTree1"
      style={{ width: 368 }}
      placeholder="custom dropdown render"
      mode="multiple"
      value={items}
      labelInValue={true}
      dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
      maxTagCount={10}
      onChange={onSelectChange}
      onDeselect={onDeselect}
      dropdownRender={() => (
        <>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            selectedKeys={selectedKeys}
            onCheck={onCheck}
            checkedKeys={{
              checked: checkedKeys,
              halfChecked: halfCheckedKeys,
            }}
            onSelect={onSelect}
            treeData={treeData}
            defaultExpandParent={false}
            checkStrictly={true}
          />
        </>
      )}
    ></Select>
  );
};

export default SelectWithTree;
