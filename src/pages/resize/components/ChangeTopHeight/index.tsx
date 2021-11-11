import React, { useRef } from 'react';
import style from './index.scss';

interface ChangeTopHeightProps {
  emitHeightChange: Function;
}

const ChangeTopHeight: React.FC<ChangeTopHeightProps> = (props) => {
  const lastY = useRef(0);

  const mouseMove = (event: any) => {
    // 移除默认事件，防止拖拽过程中出现禁止图标
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {}
    props.emitHeightChange({ changedSize: lastY.current - event.screenY });
    lastY.current = event.screenY;
  };

  const mouseUp = () => {
    console.log('ChangeTopHeight 移除mousemove');
    lastY.current = 0;
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousemove', mouseMove);
  };

  const mouseDown = (event: any) => {
    console.log('ChangeTopHeight 监听mousemove');
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
    lastY.current = event.screenY;
  };

  return <div className={style.resize} onMouseDown={mouseDown} onMouseUp={mouseUp}></div>;
};
export default ChangeTopHeight;
