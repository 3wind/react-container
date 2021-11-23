import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import store from './store';
import { demoActionSetName } from './app.redux';

const App = () => {
  const [currentState, setCurrentState] = useState(store.getState());

  useEffect(() => {
    // 可以手动订阅更新，也可以事件绑定到视图层。
    const unsubscribe = store.subscribe(() => {
      console.log('subscribe监听state变更');
      setCurrentState(store.getState());
    });
    // 移除监听
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <div>
        <span>store信息：</span>
        <p> {`${JSON.stringify(currentState)}`}</p>
      </div>
      <br />
      <Button
        onClick={() =>
          store.dispatch(
            demoActionSetName(store.getState().demo.name === 'wangWu' ? 'liSi' : 'wangWu'),
          )
        }
      >
        changeStore
      </Button>
      <br />
      <br />
      <h2>说明</h2>
      <p>
        原生redux
        <br />
        state：初始数据
        <br />
        action: 用 action 来描述“发生了什么”
        <br />
        reducer：使用 reducers 来根据 action 更新 state
        <br />
        Store 就是把它们联系到一起的对象。Store 有以下职责：
        <br />
        维持应用的 state；
        <br />
        提供 getState() 方法获取 state；
        <br />
        提供 dispatch(action) 方法更新 state；
        <br />
        通过 subscribe(listener) 注册监听器;
        <br />
        通过 subscribe(listener) 返回的函数注销监听器。
      </p>
    </div>
  );
};
export default App;
