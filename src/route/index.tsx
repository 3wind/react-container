import Exception from '@/pages/Exception';
import asyncLoad from './asyncLoad';
import { HomeOutlined, MenuOutlined, SubnodeOutlined, TableOutlined } from '@ant-design/icons';
import React from 'react';

export interface RouteProps {
  name: string;
  path: string;
  component?: any;
  exact?: boolean;
  icon?: any;
  hidden?: boolean;
  children?: RouteProps[];
  disabled?: boolean;
}

const routes = [
  {
    name: '首页',
    component: asyncLoad(() => import('@/pages/dashboard')),
    exact: true,
    path: '/',
    icon: <HomeOutlined />,
  },
  {
    name: '表格',
    component: asyncLoad(() => import('@/pages/table')),
    exact: true,
    path: '/table',
    icon: <TableOutlined />,
  },
  {
    name: '菜单',
    path: '/menu',
    icon: <MenuOutlined />,
    children: [
      {
        name: '菜单1',
        hideInMenu: true,
        path: '/menu/menu1',
        children: [
          {
            name: '菜单11',
            component: asyncLoad(() => import('@/pages/menu/menu1/menu11')),
            exact: true,
            hideInMenu: true,
            path: '/menu/menu1/menu11',
          },
        ],
      },

      {
        name: '菜单2',
        component: asyncLoad(() => import('@/pages/menu/menu2')),
        exact: true,
        hideInMenu: true,
        path: '/menu/menu2',
      },
    ],
  },
  {
    name: '子应用',
    component: asyncLoad(() => import('@/pages/subApplication')),
    exact: true,
    path: '/subApplication',
    icon: <SubnodeOutlined />,
  },
  {
    name: '异常页',
    component: Exception,
    hidden: true,
    path: '*',
  },
];

export default routes;
