import React from 'react';
import styles from './index.scss';
import { Progress } from 'antd';

interface MyCircleProgressProps {}

const MyCircleProgress = (props: MyCircleProgressProps) => {
  return (
    <div>
      <div className={styles.main}>
        <div className="circle-bar">
          <div className="circle-bar-left"></div>
          <div className="circle-bar-right"></div>
          <div className="mask">
            <span className="percent">33%</span>
          </div>
        </div>
      </div>
      <div>
        <Progress type="circle" percent={75} showInfo={false} strokeWidth={25} strokeLinecap='square'/>
        <Progress type="circle" percent={70} status="exception" />
        <Progress type="circle" percent={100} />
      </div>
    </div>
  );
};
export default MyCircleProgress;
