import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { getOption } from './options';

// 模拟数据,用来测试
const Data = {
  xAxis: ['2021-10-01', '2021-10-02', '2021-10-03', '2021-10-04', '2021-10-05', '2021-10-06', '2021-10-07'],
  data1: [50, 60, 70, 90, 40, 60, 90],
  data2: [10, 100, 50, 25, 70, 80, 60],
};
const EchartDemo = () => {
  return (
    <div>
      <ReactEcharts
        option={getOption(Data)}
        notMerge
        lazyUpdate
        style={{ height: '400px', marginTop: '10px' }}
      />
    </div>
  );
};
export default EchartDemo;
