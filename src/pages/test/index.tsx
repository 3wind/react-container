// 各种功能测试统一入口
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

const Test = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState({ b: 1 });
  useEffect(() => {
    console.log('test ci');
  }, []);
  useEffect(() => {
    console.log('a---', a);
  }, [a]);
  useEffect(() => {
    console.log('b---', b);
  }, [b]);

  const testCors = () => {
    fetch('http://192.168.255.10:9527/getUserInfo');
  };

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
      <Button type="primary" onClick={testCors}>
        test cors
      </Button>
    </div>
  );
};
export default Test;
