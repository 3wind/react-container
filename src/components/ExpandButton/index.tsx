import React from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import Styles from './index.scss';

interface ExpandBtnProps {
  text: string;
  type: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  onClick: Function;
  isExpand: boolean;
}

// 展开和收起按钮
const ExpandBtn = ({ text, type, onClick, isExpand }: ExpandBtnProps) => {
  return (
    <div className={Styles.expandBtn}>
      <Button type={type} icon={isExpand ? <UpOutlined /> : <DownOutlined />} onClick={() => onClick()}>
        {text}
      </Button>
    </div>
  );
};
export default ExpandBtn;
