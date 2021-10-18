import React from 'react';
import { render } from 'react-dom';
import App from './App';
import microApp from '@micro-zoe/micro-app'

microApp.start()
render(<App />, document.getElementById('root'));
