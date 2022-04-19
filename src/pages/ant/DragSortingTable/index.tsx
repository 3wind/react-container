import React, { useState, useCallback, useRef } from 'react';
import { Table } from 'antd';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import './index.less';

const type = 'DraggableBodyRow';

const DraggableBodyRow = ({ index, moveRow, className, style, ...restProps }: any) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor: any) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // fixed: 'left',
    width: 100,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 100,
  },
];

const DragSortingTable: React.FC = () => {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      sort_num: 3,
    },
    {
      id: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      sort_num: 2,
    },
    {
      id: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      sort_num: 1,
    },
  ]);

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [data],
  );

  return (
    <div className="test-table">
      <DndProvider backend={HTML5Backend}>
        <Table
          scroll={{ y: 200, x: 900 }}
          columns={columns}
          dataSource={data}
          rowKey='id'
          components={components}
          onRow={(record, index): any => {
            return {
              index,
              moveRow,
            };
          }}
        />
      </DndProvider>
    </div>
  );
};

export default DragSortingTable;
