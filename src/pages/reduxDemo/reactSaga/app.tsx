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
            type: 'UPDATE_LOADING_STATUS_SAGA',
            payload: { loading: !demo.loading },
          });
          dispatch({
            type: 'UPDATE_NAME_SAGA',
            payload: { name: demo.name === 'wangWu' ? 'liSi' : 'wangWu' },
          });
        }}
      >
        changeStore 2s delay
      </Button>

      <br />
      <br />
      <h2>说明</h2>
      <p>
        redux-saga
        <br />
        感觉就是利用js的generator将异步事件当做同步事件进行处理
        <br />
        select：获取当前state中的数据，例如：{'const state = yield select((state) => state)'}
        <br />
        call: 有阻塞的调用saga或者返回promise的函数
        <br />
        take：等待dispatch匹配某个action
        <br />
        put：触发对应type的action，类似于dispatch
        <br />
        takeEvery：循环监听某个触发动作，可以用while(true)来代替
        <br />
        takeLatest：触发多个action时，只触发最后一个，其他的会自动取消
        <br />
        fork：fork和cancel配合使用，实现非阻塞任务，take是阻塞的，fork是非阻塞的，cancel取消一个fork任务
      </p>
    </div>
  );
};
export default App;
