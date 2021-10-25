interface GetOptionsProps {
  width: number;
  height: number;
  dom: HTMLElement;
}

// 需求分类图容器配置
export const getOptions = ({ width, height, dom }: GetOptionsProps) => {
  return {
    container: dom,
    width, // 画布大小
    height, // 画布大小
    // 节点样式
    defaultNode: {
      type: 'node',
      labelCfg: {
        style: {
          fill: '#666',
          fontSize: 10,
        },
      },
      style: {
        stroke: '#DEE4E8',
      },
    },
    defaultEdge: {
      type: 'polyline',
      style: {
        endArrow: {
          path: 'M 0,0 L 4,2 L 4,-2 Z',
          d: -2,
          fill: '#DEE4E8',
          stroke: '#DEE4E8',
          lineWidth: 3,
        },
      },
    },
  };
};

export interface GetDataProps {
  firstVal: number; // f1
  secondVal: number; // s2
  thirdVal3: number; // t3
  fourthVal: number; // f4
  fifthVal: number; // f5
}

// 节点和连线配置
export const getData = ({ firstVal, secondVal, thirdVal3, fourthVal, fifthVal }: GetDataProps) => ({
  // 点集
  nodes: [
    {
      id: 'root',
      type: 'rect',
      size: [80, 32],
      label: 'root',
      style: {
        fill: '#fff',
      },
      x: 360,
      y: 16,
      anchorPoints: [[0.5, 1]],
    },
    {
      id: 'first', // 需求数据需求次数
      type: 'diamond',
      size: [100, 36],
      label: 'first',
      style: {
        fill: '#fff',
      },
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [1, 0.5],
      ],
      x: 360,
      y: 64,
    },
    {
      id: 'second1',
      type: 'rect',
      size: [80, 32],
      label: 'second1',
      style: {
        fill: '#fff',
      },
      x: 40,
      y: 280,
      anchorPoints: [[0.5, 0]],
    },
    {
      id: 'second2',
      type: 'diamond',
      size: [100, 36],
      label: 'second2',
      style: {
        fill: '#fff',
      },
      x: 560,
      y: 104,
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'third1',
      type: 'diamond',
      size: [100, 36],
      label: 'third1',
      style: {
        fill: '#fff',
      },
      x: 240,
      y: 160,
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'third2',
      type: 'rect',
      size: [80, 32],
      label: 'third2',
      style: {
        fill: '#fff',
      },
      x: 640,
      y: 160,
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'fourth1',
      type: 'rect',
      size: [80, 32],
      label: 'fourth1',
      style: {
        fill: '#fff',
      },
      x: 140,
      y: 200,
      anchorPoints: [
        [0.5, 0],
        [0.5, 1],
      ],
    },
    {
      id: 'fourth2',
      type: 'rect',
      size: [80, 32],
      label: 'fourth2',
      style: {
        fill: '#fff',
      },
      x: 480,
      y: 160,
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [0.5, 1],
      ],
    },
    {
      id: 'fifth1',
      type: 'rect',
      size: [80, 32],
      label: 'fifth1',
      style: {
        fill: '#fff',
      },
      x: 140,
      y: 280,
      anchorPoints: [[0.5, 0]],
    },
    {
      id: 'fifth2',
      type: 'diamond',
      size: [100, 36],
      label: 'fifth2',
      style: {
        fill: '#fff',
      },
      x: 480,
      y: 240,
      anchorPoints: [
        [0.5, 0],
        [0, 0.5],
        [1, 0.5],
      ],
    },
    {
      id: 'sixth1',
      type: 'rect',
      size: [80, 32],
      label: 'sixth1',
      style: {
        fill: '#fff',
      },
      x: 320,
      y: 280,
      anchorPoints: [[0.5, 0]],
    },
    {
      id: 'sixth2',
      type: 'rect',
      size: [80, 32],
      label: 'sixth2',
      style: {
        fill: '#fff',
      },
      x: 640,
      y: 280,
      anchorPoints: [[0.5, 0]],
    },
  ],
  // 边集
  edges: [
    {
      source: 'root',
      target: 'first',
    },
    {
      source: 'first',
      target: 'second1',
      sourceAnchor: 1,
      targetAnchor: 0,
      label: `f1≤${firstVal}`,
      labelCfg: {
        refY: 10,
        refX: -120,
      },
    },
    {
      source: 'first',
      target: 'second2',
      sourceAnchor: 2,
      targetAnchor: 0,
      label: `f1>${firstVal}`,
      labelCfg: {
        refY: 10,
        refX: -10,
      },
    },
    {
      source: 'second2',
      target: 'third1',
      sourceAnchor: 1,
      targetAnchor: 0,
      label: `s2<${secondVal}`,
      labelCfg: {
        refY: 10,
        refX: -60,
      },
    },
    {
      source: 'second2',
      target: 'third2',
      sourceAnchor: 2,
      targetAnchor: 0,
      label: `s2>${secondVal}`,
      labelCfg: {
        refY: 10,
        refX: -10,
      },
    },
    {
      source: 'third1',
      target: 'fourth1',
      sourceAnchor: 1,
      targetAnchor: 0,
      label: `t3≤${thirdVal3}`,
      labelCfg: {
        refY: 10,
        refX: -32,
      },
    },
    {
      source: 'third1',
      target: 'fourth2',
      sourceAnchor: 2,
      targetAnchor: 1,
      label: `t3>${thirdVal3}`,
      labelCfg: {
        refY: 10,
        refX: 4,
      },
    },
    {
      source: 'fourth1',
      target: 'fifth1',
      sourceAnchor: 1,
      targetAnchor: 0,
      label: `p≤${fourthVal}`,
      labelCfg: {
        refY: 20,
        refX: 0,
      },
    },
    {
      source: 'fourth2',
      target: 'fifth2',
      sourceAnchor: 2,
      targetAnchor: 0,
      label: `f4<${fourthVal}`,
      labelCfg: {
        refY: 24,
        refX: 4,
      },
    },
    {
      source: 'fifth2',
      target: 'sixth1',
      sourceAnchor: 1,
      targetAnchor: 0,
      label: `f5<${fifthVal}`,
      labelCfg: {
        refY: 16,
        refX: 4,
      },
    },
    {
      source: 'fifth2',
      target: 'sixth2',
      sourceAnchor: 2,
      targetAnchor: 0,
      label: `f5>${fifthVal}`,
      labelCfg: {
        refY: 16,
        refX: 4,
      },
    },
  ],
});
