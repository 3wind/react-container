import { List } from 'antd';
import React, { useState } from 'react';
import ResizeContainer from './components/index';

const defaultStyle = {
  width: 600,
  height: 200,
};
const MyPopover: React.FC = () => {
  const [loadPopover, setLoadPopover] = useState(false);
  const [displayPopover, setDisplayPopover] = useState(false);

  const clickBtn = () => {
    setLoadPopover(true);
    // 判断按钮当前左上角位置, 并计算得到弹出窗的展示位置
    setTimeout(() => {
      const btnRect = document.getElementById('r-strategy-btn').getBoundingClientRect();
      const container = document.getElementById(`resize-container-1`);

      // 判断按钮当前左上角位置, 并计算得到弹出窗的展示位置
      let top = btnRect.top - 12 > 0 ? btnRect.top - 12 : 2;

      const currentLeft = btnRect.left - defaultStyle.width - 16;
      let left = currentLeft > 0 ? currentLeft : 2;

      container.style.top = top + 'px';
      container.style.left = left + 'px';

      // 判断下方是否超出屏幕，超出进行截取
      let maxHeight = window.innerHeight;
      if (top + defaultStyle.width > maxHeight) {
        container.style.height = maxHeight - top - 16 + 'px';
      }
      setDisplayPopover(true);
    }, 0);
  };

  const emitHiddenEvent = () => {
    setLoadPopover(false);
    setDisplayPopover(false);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <div style={{ textAlign: 'center' }}>
        <a id="r-strategy-btn" onClick={clickBtn}>
          点击按钮
        </a>
      </div>
      {loadPopover ? (
        <div>
          <ResizeContainer
            id="1"
            minTop={0}
            minLeft={0}
            style={{ ...defaultStyle, display: !displayPopover ? 'none' : undefined }}
            emitHiddenEvent={emitHiddenEvent}
          >
            <div>
              <List header={<div>介绍</div>}>
                <List.Item>
                  <span>
                    <b>1: &nbsp;</b>
                    可以调整宽度。
                    <b>包括左侧宽度</b>。
                  </span>
                </List.Item>
                <List.Item>
                  <span>
                    <b>2:&nbsp;</b>
                    可以调整高度
                    <b>包括上侧高度</b>。
                  </span>
                </List.Item>
                <List.Item>
                  <span>
                    <b>3: &nbsp;</b>
                    可以设置最大高度，最大宽度
                    <b>最小宽高为160</b>。
                  </span>
                </List.Item>
              </List>
            </div>
          </ResizeContainer>
        </div>
      ) : null}
    </div>
  );
};
export default MyPopover;
