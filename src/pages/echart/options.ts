import { round } from 'lodash';

// 默认高度显示100%
const supportHeightItem = {
  type: 'line',
  data: [100],
  lineStyle: {
    opacity: 0,
  },
  symbol: 'none',
  tooltip: {
    show: false,
  },
};

export const getOption = (data: any) => {
  const { xAxis: xList, data1, data2 } = data || {};
  //  撑起高度处理
  supportHeightItem.data.length = xList.length;
  supportHeightItem.data.fill(100);

  const xAxis = [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        show: true,
      },
      data: xList,
      scale: true,
    },
  ];
  const yAxis = {
    type: 'value',
    axisLine: { show: false },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true
    },
  };

  const series = [
    {
      id: 'demoBar',
      name: '柱状图',
      type: 'bar',
      data: data1,
      label: {
        show: true,
        position: 'top',
        valueAnimation: true,
      },
    //   stack: 'demo',
      barMaxWidth: 50,
    },
    {
      id: 'demoLine',
      name: '折线图',
      type: 'line',
      data: data2,
      label: {
        show: true,
        position: 'top',
        valueAnimation: true,
      },
    },
    supportHeightItem,
  ];

  const legend = { show: true, right: '32px' };

  const color = ['#5193F1', '#3DCCBB'];

  const tooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  };
  const grid = {
    containLabel: true,
    left: '16px',
    right: '32px',
    top: '48px',
    width: 'auto',
  };

  const dataZoom = [
    {
      type: 'slider',
      xAxisIndex: 0,
      showDetail: false,
      height: 10,
      fillerColor: '#d3d3d3',
      handleSize: '200%',
      handleIcon: 'path://M512 320a192.064 192.064 0 0 1 0 384 192 192 0 0 1 0-384z',
      handleStyle: {
        color: '#d3d3d3',
        borderColor: '#d3d3d3',
      },
      backgroundColor: '#ebebeb',
      dataBackground: {
        lineStyle: {
          opacity: 0,
        },
        areaStyle: {
          opacity: 0,
        },
      },
    },
  ];
  const option = {
    xAxis,
    yAxis,
    series,
    legend,
    color,
    tooltip,
    grid,
    dataZoom,
  };
  return option;
};
