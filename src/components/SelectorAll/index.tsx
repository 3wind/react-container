import { Checkbox, Select } from 'antd';
import React, { useState } from 'react';

interface SelectorListProps {
  key: string;
  label: string;
}

const selectorList: SelectorListProps[] = [];
for (let i = 0; i < 36; i++) {
  selectorList.push({
    key: `${i}`,
    label: `label: ${i}`,
  });
}
interface SelectorAddCheckedAll {
  // 用来回调
  onChange: any;
}

// 支持全选
const SelectorAddCheckedAll: React.FC<SelectorAddCheckedAll> = React.forwardRef(
  (props, ref: any) => {
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
        props.onChange(selectedValues);
      } else {
        props.onChange(selectedValues.concat([value]));
      }
    };

    // 选项变化时
    const onSelectChange = (values: any) => {
      const validValues = values.filter((item: string) => item !== '全部');
      const allChecked = validValues.length === selectorList.length;
      setCheckAllStatus(allChecked);
      allChecked ? setSelectedValues(['全部']) : setSelectedValues(validValues);
      props.onChange(allChecked ? setSelectedValues(['全部']) : setSelectedValues(validValues));
    };

    // 选择全部
    const checkAllChange = (e: any) => {
      const {
        target: { checked },
      } = e;
      setCheckAllStatus(checked);
      setSelectedValues(checked ? ['全部'] : []);
      props.onChange(checked ? ['全部'] : []);
    };

    return (
      <Select
        ref={ref}
        mode="multiple"
        value={selectedValues}
        allowClear
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
        showArrow
        style={{ width: '100%' }}
        dropdownRender={(menu) => (
          <div onMouseDown={(e) => e.preventDefault()}>
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
    );
  }
);
export default SelectorAddCheckedAll;
