import React, { useState } from 'react';
import { Form, InputNumber } from 'antd';
import TitlePage from '@/components/TitlePage';
import G6Graph from './graph';
import Styles from './index.scss';

const initObj = {
  firstVal: 6,
  secondVal: 5,
  thirdVal3: 1,
  fourthVal: 20,
  fifthVal: 8,
};

const inputValid = {
  max: 100,
  min: 0,
  precision: 0,
  placeholder: '请输入',
};
const G6Demo = () => {
  const [moreTreeDate, setMoreTreeDate] = useState({ ...initObj });

  // 表单输入项改变触发
  const InputChange = (key: string, val: number | undefined) => {
    setMoreTreeDate({
      ...moreTreeDate,
      [key]: val,
    });
  };
  return (
    <div className={Styles.g6Demo}>
      <TitlePage style={{ marginBottom: 10 }} title="G6使用示例" />
      <div className={Styles.formContainer}>
        <Form
          layout="inline"
          initialValues={{
            firstVal: 6,
            secondVal: 5,
            thirdVal3: 1,
            fourthVal: 20,
            fifthVal: 8,
          }}
        >
          <Form.Item label="参数1（f1）：">
            <InputNumber
              onChange={(e) => InputChange('firstVal', e)}
              max={100}
              min={0}
              precision={0}
              placeholder="请输入"
            />
          </Form.Item>
          <Form.Item label="参数2（s2）:">
            <InputNumber onChange={(e) => InputChange('secondVal', e)} {...inputValid} />
          </Form.Item>
          <Form.Item label="参数3（t3）:">
            <InputNumber onChange={(e) => InputChange('thirdVal3', e)} {...inputValid} />
          </Form.Item>
          <Form.Item label="参数4（f4）:">
            <InputNumber onChange={(e) => InputChange('fourthVal', e)} {...inputValid} />
          </Form.Item>
          <Form.Item label="参数5（f5）:">
            <InputNumber onChange={(e) => InputChange('fifthVal', e)} {...inputValid} />
          </Form.Item>
        </Form>
      </div>

      <G6Graph moreTreeDate={moreTreeDate} />
    </div>
  );
};

export default G6Demo;
