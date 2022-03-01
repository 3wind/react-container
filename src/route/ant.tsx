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
        name: '组合select和tree',
        component: asyncLoad(() => import('@/pages/ant/SelectWithTree')),
        exact: true,
        path: '/ant/SelectWithTree',
      },
      {
        name: 'QueryTable',
        component: asyncLoad(() => import('@/pages/ant/Table')),
        exact: true,
        path: '/ant/QueryTable',
      },
      {
        name: 'Ant3带全选下拉框',
        component: asyncLoad(() => import('@/pages/ant/Selector')),
        exact: true,
        path: '/ant/Selector',
      },
      {
        name: 'TreeSelect',
        component: asyncLoad(() => import('@/pages/ant/TreeSelect')),
        exact: true,
        path: '/ant/TreeSelect',
      },
    ],
  },
];
