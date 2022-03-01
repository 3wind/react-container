//form item

import { Input } from 'antd';
import React from 'react';
import SelectorAddCheckedAll from '@/components/SelectorAll';
import { FilterFormItemProps } from '@/components/FilterForm/interface';
import moment from 'moment';

export const filterItems: FilterFormItemProps[] = [
  {
    title: '输入框',
    dataIndex: '1',
    valueType: 'text',
    initialValue: '1',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '多选框',
    dataIndex: '2',
    valueType: 'checkbox',
    selectOptions: [
      {
        value: '1',
        label: '选择1',
      },
      {
        value: '2',
        label: '选择2',
      },
    ],
  },
  {
    title: '选择器',
    dataIndex: '3',
    valueType: 'selector',
    selectOptions: [
      {
        value: '1',
        label: 'Test1',
      },
      {
        value: '2',
        label: 'Test2',
      },
    ],
  },
  {
    title: '数字',
    dataIndex: '4',
    valueType: 'digit',
  },
  {
    title: '自定义组件',
    dataIndex: '5',
    valueType: 'component',
    initialValue: '自定义组件3',
    component: (rest, ref) => {
      return <Input ref={ref} placeholder="自定义组件" {...rest} />;
    },
  },
  {
    title: '自定义组件2',
    dataIndex: '6',
    valueType: 'component',
    initialValue: '全部',
    component: (rest, ref) => {
      return <SelectorAddCheckedAll ref={ref} {...rest} />;
    },
  },
  {
    title: '时间',
    dataIndex: '7',
    valueType: 'datePicker',
    itemProps: {
      picker: 'time',
    },
  },
  {
    title: '日期',
    dataIndex: '8',
    valueType: 'datePicker',
    itemProps: {
      picker: 'date',
    },
  },
  {
    title: '选择周',
    dataIndex: '9',
    valueType: 'datePicker',
    itemProps: {
      picker: 'week',
    },
  },
  {
    title: '选择月',
    dataIndex: '10',
    valueType: 'datePicker',
    itemProps: {
      picker: 'month',
    },
  },
  {
    title: '选择季度',
    dataIndex: '11',
    valueType: 'datePicker',
    itemProps: {
      picker: 'quarter',
    },
  },
  {
    title: '选择年',
    dataIndex: '12',
    valueType: 'datePicker',
    itemProps: {
      picker: 'year',
    },
  },
  {
    title: '日期范围',
    dataIndex: '13',
    valueType: 'rangePicker',
    itemProps: {
      disabledDate: (currentDate: any) => {
        return currentDate && currentDate > moment().endOf('day');
      },
    },
  },
  {
    title: '时间范围',
    dataIndex: '14',
    valueType: 'rangePicker',
    itemProps: {
      showTime: true,
    },
  },
  {
    title: '周范围',
    dataIndex: '15',
    valueType: 'rangePicker',
    itemProps: {
      picker: 'week',
    },
  },
  {
    title: '月范围',
    dataIndex: '16',
    valueType: 'rangePicker',
    itemProps: {
      picker: 'month',
    },
  },
  {
    title: '年范围',
    dataIndex: '17',
    valueType: 'rangePicker',
    itemProps: {
      picker: 'year',
    },
  },
];
