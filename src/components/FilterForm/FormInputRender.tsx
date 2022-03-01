import { Checkbox, DatePicker, Input, InputNumber, Select, TimePicker } from 'antd';
import { FormInstance } from 'antd/es/form';
import React from 'react';
import { FilterFormItemProps } from './interface';

export const FormInputRender: React.FC<{
  item: FilterFormItemProps;
  value?: any;
  form?: FormInstance;
  onChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}> = React.forwardRef((props, ref: any) => {
  const { item, form, ...rest } = props;
  const { valueType } = item;

  if (!valueType || valueType === 'text') {
    return (
      <Input ref={ref} placeholder={item.placeholder || '请输入'} {...rest} {...item.itemProps} />
    );
  }

  if (valueType === 'selector') {
    const selectOptions = item.selectOptions || [];
    return (
      <Select
        ref={ref}
        allowClear
        placeholder={item.placeholder || '请选择'}
        {...rest}
        {...item.itemProps}
      >
        {selectOptions.map(({ value, label }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
    );
  }

  if (valueType === 'checkbox') {
    const selectOptions = item.selectOptions || [];
    return <Checkbox.Group options={selectOptions} ref={ref} {...rest} {...item.itemProps} />;
  }

  if (valueType === 'datePicker') {
    return (
      <DatePicker
        ref={ref}
        placeholder={item.placeholder || '请选择'}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.itemProps}
      />
    );
  }

  if (valueType === 'rangePicker') {
    return (
      <DatePicker.RangePicker
        ref={ref}
        placeholder={[item.placeholder || '开始日期', item.placeholder || '结束日期']}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.itemProps}
      />
    );
  }
  if (valueType === 'digit') {
    return (
      <InputNumber
        ref={ref}
        placeholder={item.placeholder || '请输入'}
        style={{
          width: '100%',
        }}
        {...rest}
        {...item.itemProps}
      />
    );
  }

  if (valueType === 'component') {
    return item.component ? item.component(rest, ref) : null;
  }

  return (
    <Input ref={ref} placeholder={item.placeholder || '请输入'} {...rest} {...item.itemProps} />
  );
});
