import { FormInstance } from 'antd';
import React, { useRef } from 'react';
import FilterForm from '@/components/FilterForm';
import { filterItems } from './constants';

const Table: React.FC = () => {
  const formRef = useRef<FormInstance>();

  // form高度变化时重新计算table高度
  const sTableContainerRef = React.createRef<any>();
  const onCollapseChange = () => {
    sTableContainerRef.current?.resetHeight();
  };

  //查询回调，并且可以通过formRef获取form和对应子项的实例
  const onSubmit = (value: any) => {
    console.log(
      'onSubmit.可以获取form值，实例，item实例',
      value,
      formRef,
      formRef.current?.getFieldsValue(),
      formRef.current?.getFieldInstance(['1']),
    );
  };

  //from重置
  const onReset = (value: any) => {
    console.log('onReset', value);
  };

  //每次数据变更后回调，如果需要一些关联处理可以使用该方法
  const onValueChange = (changedValues: any, allValues: any) => {
    // console.log('onValueChange', changedValues, allValues);
  };

  return (
    <FilterForm
      formItems={filterItems}
      onSubmit={onSubmit}
      onReset={onReset}
      onValueChange={onValueChange}
      formRef={formRef}
      onCollapseChange={onCollapseChange}
    />
  );
};
export default Table;
