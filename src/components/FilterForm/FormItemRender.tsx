import React from 'react';
import { Col, Form, Tooltip } from 'antd';
import { FormInstance } from 'antd/es/form';
import { ReactNode } from 'react';
import { FormInputRender } from './FormInputRender';
import { FilterFormItemProps } from './interface';

export const proFormItemRender: (props: {
  item: FilterFormItemProps;
  formInstance?: FormInstance;
  colConfig:
    | {
        span: number;
      }
    | undefined;
}) => null | JSX.Element = ({ item, formInstance, colConfig }) => {
  const {
    valueType,
    selectOptions,
    order,
    initialValue,
    formItemProps,
    itemProps,
    dataIndex,
    component,
    hidden,
    ...rest
  } = item;
  const dom = <FormInputRender item={item} form={formInstance} />;
  if (!dom) {
    return null;
  }

  // 处理label,避免超长文本破坏布局
  const handleFormItemLabel = (title: string | ReactNode) => {
    if (typeof title !== 'string') return null;
    if (title.length > 5) {
      return (
        <Tooltip placement="top" title={title}>
          {title}
        </Tooltip>
      );
    }
    return title;
  };

  return (
    <Col {...colConfig} key={dataIndex} style={hidden ? { display: 'none' } : {}}>
      <Form.Item
        labelAlign="right"
        label={handleFormItemLabel(rest.title)}
        name={dataIndex}
        {...formItemProps}
        {...rest}
      >
        {dom}
      </Form.Item>
    </Col>
  );
};
