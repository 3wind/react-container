import React, { useRef } from 'react';
import style from './index.scss';

interface ChangeLeftWidthProps {
  emitWidthChange: Function;
}

const ChangeLeftWidth: React.FC<ChangeLeftWidthProps> = (props) => {
  const lastX = useRef(0);

  const mouseMove = (event: any) => {
    // 移除默认事件，防止拖拽过程中出现禁止图标
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {}
    props.emitWidthChange({ changedSize: lastX.current - event.screenX });
    lastX.current = event.screenX;
  };

  const mouseUp = () => {
    console.log('ChangeLeftWidth 移除mousemove');
    lastX.current = 0;
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousemove', mouseMove);
  };

  const mouseDown = (event: any) => {
    console.log('ChangeLeftWidth 监听mousemove');
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
    lastX.current = event.screenX;
  };

  return <div className={style.resize} onMouseDown={mouseDown} onMouseUp={mouseUp}></div>;
};
export default ChangeLeftWidth;
