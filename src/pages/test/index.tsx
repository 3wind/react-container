// 各种功能测试统一入口
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

interface AppProps {}

const Test = () => {
  const [count, setCount] = useState(1);
  const [a, setA] = useState(1);
  const [b, setB] = useState({ b: 1 });
  useEffect(() => {
    console.log('test ci')
  }, []);
  useEffect(() => {
    console.log('a---', a, b);
  }, [a]);
  useEffect(() => {
    console.log('b---', a, b);
  }, [b]);
  return (
    <div>
      <Button type="primary" onClick={() => setA(a)}>
        testA1
      </Button>
      <Button type="primary" onClick={() => setA(a + 1)}>
        testA2
      </Button>
      &nbsp;
      <Button type="primary" onClick={() => setB({ b: b.b })}>
        testB1
      </Button>
      <Button type="primary" onClick={() => setB({ b: b.b + 1 })}>
        testB2
      </Button>
    </div>
  );
};
export default Test;
