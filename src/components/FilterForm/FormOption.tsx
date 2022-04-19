import React from 'react';
import { Button, Space } from 'antd';
import { SearchConfig } from './interface';

export interface FormOptionProps {
  searchConfig: SearchConfig;
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  showCollapseButton: boolean;
  submit: () => void;
  onReset: () => void;
}

/**
 * 查询和重置按钮
 * @param props
 */
const FormOption: React.FC<FormOptionProps> = (props) => {
  const { setCollapse, collapse, showCollapseButton, searchConfig, submit, onReset } = props;
  const { searchText, resetText, collapseRender } = searchConfig;
  return (
    <Space size={16}>
      {showCollapseButton && (
        <a
          className="collapseText"
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          {collapseRender && collapseRender(collapse)}
        </a>
      )}
      <Button onClick={() => onReset()}>{resetText}</Button>
      <Button type="primary" htmlType="submit" onClick={() => submit()}>
        {searchText}
      </Button>
    </Space>
  );
};

export default FormOption;
