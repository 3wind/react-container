import React from 'react';
import { render } from 'react-dom';
import App from './App';
import microApp from '@micro-zoe/micro-app';
import '@/styles/reset.css';
import './utils/rem';
import { store } from './redux/store';
import { Provider } from 'react-redux';

microApp.start();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
