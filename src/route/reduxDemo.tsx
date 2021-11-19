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
        name: '最简单的Redux',
        component: asyncLoad(() => import('@/pages/reduxDemo/redux/app')),
        exact: true,
        hideInMenu: true,
        path: '/pages/reduxDemo/redux/app',
      },
    ],
  },
];
