import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './app';

const Demo = () => {
  return (
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
};
export default Demo;
