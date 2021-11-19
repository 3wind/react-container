import React from 'react';
import BasicLayout from './layout/BasicLayout';
import { HashRouter as Router, Switch } from 'react-router-dom';
import routes from '@/route/index';
import { generateRoutes } from './route/utils';

function App() {
  return (
    <Router>
      <BasicLayout>
        <Switch>{generateRoutes(routes)}</Switch>
      </BasicLayout>
    </Router>
  );
}

export default App;
