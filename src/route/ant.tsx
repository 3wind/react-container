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
        name: 'Ant3带全选下拉框',
        component: asyncLoad(() => import('@/pages/ant/Selector')),
        exact: true,
        hideInMenu: true,
        path: '/ant/Selector',
      },
      {
        name: 'TreeSelect',
        component: asyncLoad(() => import('@/pages/ant/TreeSelect')),
        exact: true,
        hideInMenu: true,
        path: '/ant/TreeSelect',
      },
    ],
  },
];
