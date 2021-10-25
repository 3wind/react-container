import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';
import { getOptions, getData } from './options';
import Styles from './index.scss';

let graph: any = null;

const G6Graph = ({
  moreTreeDate = {
    firstVal: 1,
    secondVal: 2,
    thirdVal3: 3,
    fourthVal: 4,
    fifthVal: 5,
  },
}) => {
  const ref: any = React.useRef(null);

  useEffect(() => {
    return () => {
      graph.destroy();
      graph = null;
    };
  }, []);

  useEffect(() => {
    if (!graph) {
      const currentDom: any = ReactDOM.findDOMNode(ref.current);
      graph = new G6.Graph(getOptions({ width: 720, height: 320, dom: currentDom }));
    }
    graph.data(getData(moreTreeDate));
    graph.render();
  }, [moreTreeDate]);

  return (
    <div className={Styles.g6Graph}>
      <div className={Styles.container}>
        <div className={Styles.title}>G6使用示例图</div>
        <div ref={ref} />
      </div>
    </div>
  );
};

export default G6Graph;
