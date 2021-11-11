import React, { useEffect } from 'react';
import ChangeBottomHeight from './ChangeBottomHeight';
import ChangeLeftWidth from './ChangeLeftWidth';
import ChangeRightWidth from './ChangeRightWidth';
import ChangeTopHeight from './ChangeTopHeight';
import styles from './index.scss';

interface ResizeContainerProps {
  id: string;
  style?: any;
  minLeft?: number;
  minTop?: number;
  emitHiddenEvent?: Function;
}

interface ChangeSizeInfo {
  changedSize: number;
}

const minWidth = 161;
const minHeight = 161;
const minLeft = 0;
const minTop = 0;

const ResizeContainer: React.FC<ResizeContainerProps> = (props) => {
  useEffect(() => {
    window.addEventListener('mousedown', mouseClick);
    window.addEventListener('resize', windowsResize);
    return () => {
      window.removeEventListener('mousedown', mouseClick);
      window.removeEventListener('resize', windowsResize);
    };
  }, []);

  // 右侧变化
  const rightWidthChange = ({ changedSize }: ChangeSizeInfo) => {
    const container = document.getElementById(`resize-container-${props.id}`);
    let maxWidth = window.innerWidth;

    const containerRect = container.getBoundingClientRect();
    const currentWidth = containerRect.width + changedSize;

    // 左侧加宽度是否大于最大屏幕
    if (containerRect.left + currentWidth < maxWidth - 32) {
      container.style.width = currentWidth + 'px';
    } else {
      container.style.width = maxWidth - 32 - containerRect.left + 'px';
    }
  };

  // 左侧变化
  const leftWidthChange = ({ changedSize }: ChangeSizeInfo) => {
    const container = document.getElementById(`resize-container-${props.id}`);

    const containerRect = container.getBoundingClientRect();
    const currentLeft = containerRect.left - changedSize;
    const currentWidth = containerRect.width + changedSize;
    if (currentWidth < minWidth) {
      return;
    }
    // 左侧加宽度是否大于最大屏幕
    const currentMinLeft = props.minLeft ? props.minLeft : minLeft;
    if (currentLeft > currentMinLeft) {
      container.style.left = currentLeft + 'px';
      container.style.width = currentWidth + 'px';
    } else {
      container.style.left = currentMinLeft + 'px';
      container.style.width = containerRect.width + 'px';
    }
  };

  // 下侧变化
  const bottomHeightChange = ({ changedSize }: ChangeSizeInfo) => {
    const container = document.getElementById(`resize-container-${props.id}`);
    let maxHeight = window.innerHeight;

    const containerRect = container.getBoundingClientRect();
    const currentHeight = containerRect.height + changedSize;

    // 左侧加宽度是否大于最大屏幕
    if (containerRect.top + currentHeight < maxHeight - 32) {
      container.style.height = currentHeight + 'px';
    } else {
      container.style.height = maxHeight - 32 - containerRect.top + 'px';
    }
  };

  // 上侧变化
  const topHeightChange = ({ changedSize }: ChangeSizeInfo) => {
    const container = document.getElementById(`resize-container-${props.id}`);

    const containerRect = container.getBoundingClientRect();
    const currentTop = containerRect.top - changedSize;
    const currentHeight = containerRect.height + changedSize;
    if (currentHeight < minHeight) {
      return;
    }
    // 左侧加宽度是否大于最大屏幕
    const currentMinTop: number = props.minTop ? props.minTop : minTop;
    if (currentTop > currentMinTop) {
      container.style.top = currentTop + 'px';
      container.style.height = currentHeight + 'px';
    } else {
      container.style.top = currentMinTop + 'px';
      container.style.height = containerRect.height + 'px';
    }
  };

  // 鼠标点击区域以外的信息将容器隐藏
  const mouseClick = (event: any) => {
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch (e) {}
    const sp = document.getElementById(`resize-container-${props.id}`);
    if (sp && !sp.contains(event.target) && props.emitHiddenEvent) {
      props.emitHiddenEvent();
    }
  };

  // 窗口尺寸变化将容器隐藏
  const windowsResize = () => {
    if (props.emitHiddenEvent) {
      props.emitHiddenEvent();
    }
  };

  return (
    <div id={`resize-container-${props.id}`} className={styles.resize} style={props.style}>
      <div className={styles.children}>{props.children}</div>
      <ChangeLeftWidth emitWidthChange={leftWidthChange} />
      <ChangeRightWidth emitWidthChange={rightWidthChange} />
      <ChangeBottomHeight emitHeightChange={bottomHeightChange} />
      <ChangeTopHeight emitHeightChange={topHeightChange} />
    </div>
  );
};
export default ResizeContainer;
