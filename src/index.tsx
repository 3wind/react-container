import React from 'react';
import { render } from 'react-dom';
import App from './App';
import microApp from '@micro-zoe/micro-app'
import '@/styles/reset.css'
import './utils/rem'

microApp.start()
render(<App />, document.getElementById('root'));
