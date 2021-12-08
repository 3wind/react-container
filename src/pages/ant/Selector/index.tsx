import { Checkbox, Select } from 'antd';
import React, { useState } from 'react';
import styles from './index.scss';

interface SelectorListProps {
  key: string;
  label: string;
}

const selectorList: SelectorListProps[] = [];
for (let i = 0; i < 36; i++) {
  selectorList.push({
    key: `key: ${i}`,
    label: `label: ${i}`,
  });
}

// 支持全选
const SelectorAddCheckedAll: React.FC = () => {
  const [selectedValues, setSelectedValues] = useState<any>(['全部']);
  const [checkAllStatus, setCheckAllStatus] = useState<boolean>(true);

  // 选中全部时，将第一次点击效果更改为取消选中的效果（全选时所有子选项都是假选）
  const onSelected = (value: string) => {
    if (checkAllStatus) {
      const selectedValues = selectorList
        .map((el: any) => {
          return el.key;
        })
        .filter((item: any) => item !== value);
      setSelectedValues(selectedValues);
    }
  };

  // 选项变化时
  const onSelectChange = (values: any) => {
    const validValues = values.filter((item: string) => item !== '全部');
    const allChecked = validValues.length === selectorList.length;
    setCheckAllStatus(allChecked);
    allChecked ? setSelectedValues(['全部']) : setSelectedValues(validValues);
  };

  // 选择全部
  const checkAllChange = (e: any) => {
    const {
      target: { checked },
    } = e;
    setCheckAllStatus(checked);
    setSelectedValues(checked ? ['全部'] : []);
  };

  return (
    <div style={{ width: '50%', margin: 16 }}>
      <Select
        mode="multiple"
        value={selectedValues}
        maxTagCount={1}
        maxTagTextLength={8}
        placeholder="不选择默认全部"
        showSearch
        filterOption={(input: string, option: any) =>
          option.props.children.toLowerCase().includes(input.toLowerCase())
        }
        onSelect={(e: string) => onSelected(e)}
        onChange={(e: any) => onSelectChange(e)}
        defaultActiveFirstOption={false}
        showArrow={true}
        style={{ width: '100%' }}
        dropdownRender={(menu) => (
          <div
            className={checkAllStatus ? styles.selectorDropdownRender : undefined}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div style={{ margin: '5px 0 5px 10px', cursor: 'pointer' }}>
              <Checkbox checked={checkAllStatus} onChange={(e) => checkAllChange(e)}>
                全部
              </Checkbox>
            </div>
            {menu}
          </div>
        )}
      >
        {Array.isArray(selectorList) &&
          selectorList.map((el) => {
            return (
              <Select.Option key={el.key} value={el.key}>
                {el.label}
              </Select.Option>
            );
          })}
      </Select>
      <br />
      <h2>说明:</h2>
      <p>
        上方是ant3时实现带全选功能的selector，
        <br />
        ant4中新增<strong>tagRender</strong>元素，可以通过改属性控制input回显
        <br />
        ant4对比ant3中ant-select-dropdown-menu-item变更为ant-select-item，并且在不勾选是不再渲染ant-select-selected-icon元素
      </p>
    </div>
  );
};
export default SelectorAddCheckedAll;
