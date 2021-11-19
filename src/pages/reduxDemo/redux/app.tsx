import React from 'react';
import { Button } from 'antd';
import store from './store';

const App = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log('store', store.getState());
        }}
      >
        printStore
      </Button>
      <Button onClick={() => store.dispatch({ type: 'CHANGE_NAME', payload: { name: 'liSi' } })}>
        changeStore
      </Button>
    </div>
  );
};
export default App;
