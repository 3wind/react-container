import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import asyncLoad from './asyncLoad';

export const timeUtils = [
  {
    name: '时间处理工具',
    path: '/time',
    icon: <MenuOutlined />,
    children: [
      {
        name: 'Moment',
        component: asyncLoad(() => import('@/pages/time/moment')),
        exact: true,
        hideInMenu: true,
        path: '/time/moment',
      },
    ],
  },
];
