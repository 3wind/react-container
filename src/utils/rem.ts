function rem() {
  const docEl = document.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const reCalc = function () {
    const clientHeight = docEl.clientHeight;
    // 500为最小有效高度，可根据需要配置
    const scale = Math.max(clientHeight, 500) / 750;
    docEl.style.fontSize = 100 * scale + 'px';
  };
  reCalc();
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, reCalc, false);
  document.addEventListener('DOMContentLoaded', reCalc, false);
}

rem();
