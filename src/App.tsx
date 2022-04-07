import React from 'react';
import BasicLayout from './layout/BasicLayout';
import { HashRouter as Router, Switch } from 'react-router-dom';
import routes from '@/route/index';
import { generateRoutes } from './route/utils';
import './utils/rem';
import BigScreen from './pages/bigScreen';

function App() {
  return (
    <Router>
      {window.location.pathname === '/bigScreen' || window.location.hash === '#/bigScreen' ? (
        <BigScreen />
      ) : (
        <BasicLayout>
          <Switch>{generateRoutes(routes)}</Switch>
        </BasicLayout>
      )}
    </Router>
  );
}

export default App;
