import React from 'react';
import { Button, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { getReduxTestDataAPI } from '@/services/reduxTest';
import { useRequest } from 'ahooks';
import { batch } from 'react-redux';

const App = () => {
  const state = useSelector((state: RootState) => state);
  const { demo } = state;

  const dispatch = useDispatch();

  console.log('页面重新渲染', demo);

  const updateRedux = () => {
    batch(() => {
      dispatch({
        type: 'CHANGE_LOADING_STATUS',
        payload: { loading: !demo.loading },
      });
      dispatch({
        type: 'CHANGE_NAME',
        payload: { name: demo.name === 'wangWu' ? 'liSi' : 'wangWu' },
      });
    });
  };

  const getReduxTestDataByUseRequest = useRequest(() => getReduxTestDataAPI(), {
    manual: true,
    onSuccess(data: any) {
      console.log('getReduxTestDataByUseRequest success', data);
      updateRedux();
    },
  });

  const getReduxTestData = () => {
    getReduxTestDataAPI().then((data) => {
      console.log('getReduxTestData', data);
      updateRedux();
    });
  };

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
      <Button onClick={() => updateRedux()}>同步事件</Button>
      <Button onClick={() => Promise.resolve().then(() => updateRedux())}>promise异步事件</Button>
      <Button onClick={() => getReduxTestData()}>promise网络异步事件</Button>
      <Button onClick={() => getReduxTestDataByUseRequest.run()}>useRequest异步事件</Button>

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
        <strong>注意</strong>
        <br />
        <span>
          1、在正常的react的事件流里（如onClick等） setState是异步执行的（不会立即更新state的结果）
          多次执行setState，只会调用一次重新渲染render
          <br />
          2、在setTimeout，Promise.then等异步事件中 setState是同步执行的（立即更新state的结果）
          多次执行setState，每一次的执行setState，都会调用一次render
        </span>
      </p>
    </div>
  );
};
export default App;
