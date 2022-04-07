import { flattenDeep } from 'lodash';
import React from 'react';
import { Route } from 'react-router-dom';
import { RouteProps } from './index';

const generateRoutesHelper: any = (routes: RouteProps[]) =>
  routes.map(({ path, exact = true, component, children }: RouteProps) => {
    const components = [];
    if (component) {
      const routeComponent = <Route key={path} path={path} exact={exact} component={component} />;
      components.push(routeComponent);
    }
    if (children) {
      components.push(generateRoutesHelper(children));
    }
    return components;
  });

export const generateRoutes = (routes: RouteProps[]) => flattenDeep(generateRoutesHelper(routes));
