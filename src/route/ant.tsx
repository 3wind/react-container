import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import asyncLoad from './asyncLoad';

export const antComponent = [
  {
    name: 'Ant Design',
    path: '/ant',
    icon: <MenuOutlined />,
    children: [
      {
        name: 'TreeSelect',
        component: asyncLoad(() => import('@/pages/ant/TreeSelect')),
        exact: true,
        hideInMenu: true,
        path: '/ant/TreeSelect',
      }
    ],
  },
];
