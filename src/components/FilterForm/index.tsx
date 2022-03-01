import { Col, Form, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useEffect, useRef, useState } from 'react';
import { FilterFormProps } from './interface';
import { getDefaultSearch, getOffset, getColSpan } from './utils';
import { proFormItemRender } from './FormItemRender';
import FormOption from './FormOption';
import './index.less';
import { throttle } from 'lodash';
import useMergeValue from '@/utils/useMergeValue';

const className = 'filter-form';

const FilterForm = <T, U>({
  formItems,
  onSubmit,
  formRef,
  search: propsSearch,
  form: formConfig = {},
  onReset,
  onValueChange,
  onCollapseChange,
}: FilterFormProps<T>) => {
  const [form] = Form.useForm();
  const formInstanceRef = useRef<FormInstance | undefined>();
  const searchConfig = getDefaultSearch(propsSearch);
  const [collapse, setCollapse] = useMergeValue<boolean>(true, {
    value: searchConfig.collapsed,
    onChange: searchConfig.onCollapse,
  });

  // 默认每行3个
  const [colSize, setColSize] = useState(8);
  const rowNumber = Math.ceil(24 / colSize) || 3;

  useEffect(() => {
    // 监听浏览器缩放，实时更新col占用栅格数
    setColSize(getColSpan(document.body.clientWidth));
    const resizeFn = () => {
      setColSize(getColSpan(document.body.clientWidth));
    };
    window.addEventListener('resize', throttle(resizeFn, 500));
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, []);

  /**
   *提交表单
   */
  const submit = async () => {
    form.validateFields().then((values) => {
      if (onSubmit) {
        onSubmit(values);
      }
    });
  };

  /**
   *重置表单
   */
  const reset = async () => {
    form.resetFields();
    if (onReset) {
      const value = form.getFieldsValue();
      onReset(value);
    }
    return;
  };

  useEffect(() => {
    if (!formRef) {
      return;
    }
    formRef.current = {
      ...form,
    };
  }, []);

  useEffect(() => {
    onCollapseChange && onCollapseChange();
  }, [collapse]);

  const colConfig = { span: colSize };

  /**
   *每次form值改变后触发，提供给一些需要联动处理的特殊需求
   */
  const emitValuesChange = (changedValues: T, allValues: T) => {
    if (onValueChange) {
      onValueChange(changedValues, allValues);
    }
  };

  /**
   * 每次更新时根据是否展开控制item的隐藏属性
   */
  formItems.forEach((item, index) => {
    if (collapse && index >= (rowNumber * 2 - 1 || 1)) {
      item.hidden = true;
    } else {
      item.hidden = false;
    }
  });

  const domList = formItems.map((item) =>
    proFormItemRender({
      formInstance: formInstanceRef.current,
      item,
      colConfig,
    })
  );

  return (
    <div className={className}>
      <Form
        className="form-container"
        {...formConfig}
        form={form}
        onValuesChange={emitValuesChange}
        initialValues={formItems.reduce(
          (pre, item) => {
            const key = item.dataIndex || '';
            if (item.initialValue) {
              return {
                ...pre,
                [key]: item.initialValue,
              };
            }
            return pre;
          },
          { ...formConfig.initialValues }
        )}
      >
        <Row gutter={32} justify="start">
          <Form.Item shouldUpdate noStyle>
            <>{domList}</>
          </Form.Item>
          <Col
            {...colConfig}
            offset={getOffset(formItems.filter((item) => !item.hidden).length, colSize)}
            key="option"
            className={`${className}-option`}
          >
            <Form.Item>
              <FormOption
                showCollapseButton={formItems.length > rowNumber * 2 - 1}
                searchConfig={searchConfig}
                submit={submit}
                onReset={reset}
                collapse={collapse}
                setCollapse={setCollapse}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FilterForm;
