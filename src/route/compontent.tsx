import { SnippetsOutlined } from '@ant-design/icons';
import React from 'react';
import asyncLoad from './asyncLoad';

export const myComponent = [
  {
    name: '功能组件',
    path: '/components',
    icon: <SnippetsOutlined />,
    children: [
      {
        name: '提示框（宽高可变）',
        component: asyncLoad(() => import('@/pages/resize')),
        exact: true,
        path: '/components/resize',
      },
      {
        name: 'FullCalendar',
        component: asyncLoad(() => import('@/pages/calendar')),
        exact: true,
        path: '/components/fullCalendar',
      },
    ],
  },
];
