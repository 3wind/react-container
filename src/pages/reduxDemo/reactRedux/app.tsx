import React from 'react';
import { Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const App = () => {
  const state = useSelector((state: RootState) => state);
  const { demo } = state;

  const dispatch = useDispatch();

  return (
    <div style={{ padding: 16 }}>
      <div>
        <span>store信息：</span>
        <p> {`${JSON.stringify(state)}`}</p>
      </div>
      <br />
      <Spin spinning={demo.loading}>
        <div style={{ width: 400, height: 100 }}>{`loading状态: ${demo.loading}`}</div>
      </Spin>
      <Button
        onClick={() => {
          dispatch({
            type: 'CHANGE_LOADING_STATUS',
            payload: { loading: !demo.loading },
          });
          dispatch({
            type: 'CHANGE_NAME',
            payload: { name: demo.name === 'wangWu' ? 'liSi' : 'wangWu' },
          });
        }}
      >
        changeStore
      </Button>

      <br />
      <br />
      <h2>说明</h2>
      <p>
        redux-action
        <br />
        引入redux-action可以简化action和reducer的创建
        <br />
        引入immer：immer 基于传入的 state 照着draft 的修改 返回一个新的 state
        <br />
        <br />
        react-redux
        <br />
        {'<Provider>放置到根组件，用来全局store'}
        <br />
        useSelector获取state
        <br />
        useDispatch获取dispatch
        <br />
      </p>
    </div>
  );
};
export default App;
