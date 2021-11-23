import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import asyncLoad from './asyncLoad';

export const reduxDemo = [
  {
    name: 'Redux 使用示例',
    path: '/redux',
    icon: <MenuOutlined />,
    children: [
      {
        name: '原生Redux',
        component: asyncLoad(() => import('@/pages/reduxDemo/redux/app')),
        exact: true,
        hideInMenu: true,
        path: '/pages/reduxDemo/redux/app',
      },
      {
        name: 'react-redux',
        component: asyncLoad(() => import('@/pages/reduxDemo/reactRedux/index')),
        exact: true,
        hideInMenu: true,
        path: '/pages/reduxDemo/reactRedux/demo',
      },
      {
        name: 'react-saga',
        component: asyncLoad(() => import('@/pages/reduxDemo/reactSaga/index')),
        exact: true,
        hideInMenu: true,
        path: '/pages/reduxDemo/reactSaga/demo',
      },
    ],
  },
];
