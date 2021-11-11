import React, { useRef } from 'react';
import style from './index.scss';

interface ChangeBottomHeightProps {
  emitHeightChange: Function;
}

const ChangeBottomHeight: React.FC<ChangeBottomHeightProps> = (props) => {
  const lastY = useRef(0);

  const mouseMove = (event: any) => {
    preventDefaultEvent(event);
    props.emitHeightChange({ changedSize: event.screenY - lastY.current });
    lastY.current = event.screenY;
  };

  const mouseUp = (event: any) => {
    console.log('ChangeBottomHeight 移除mousemove');
    lastY.current = 0;
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousemove', mouseMove);
  };

  const mouseDown = (event: any) => {
    console.log('ChangeBottomHeight 监听mousemove');
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
    lastY.current = event.screenY;
  };

  // 移除默认事件，防止拖拽过程中出现禁止图标
  const preventDefaultEvent = (event: any) => {
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {}
  };
  return <div className={style.resize} onMouseDown={mouseDown} onMouseUp={mouseUp}></div>;
};
export default ChangeBottomHeight;
