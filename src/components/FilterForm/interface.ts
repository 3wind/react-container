import { FormInstance, FormItemProps, FormProps } from 'antd/es/form';
import { ReactElement, ReactNode } from 'react';

/**
 * 用于配置操作栏
 */
export interface SearchConfig {
  /**
   * 查询按钮的文本
   */
  searchText?: string;
  /**
   * 重置按钮的文本
   */
  resetText?: string;
  /**
   * 布局设置
   */
  span?: number;
  /**
   * 收起按钮的 render
   */
  collapseRender?: (
    collapsed: boolean,
    /**
     * 是否应该展示，有两种情况
     * 列只有三列，不需要收起
     * form 模式 不需要收起
     */
    showCollapseButton?: boolean
  ) => React.ReactNode;

  /**
   * 是否收起
   */
  collapsed?: boolean;
  /**
   * 收起按钮的事件
   */
  onCollapse?: (collapsed: boolean) => void;
}

/**
 * input 输入
 * selector 选择器
 * checkbox 多选框
 * date 日期 YYYY-MM-DD
 * dateRange 日期范围 YYYY-MM-DD[]
 * dateTime 日期和时间 YYYY-MM-DD HH:mm:ss
 * dateTimeRange 范围日期和时间 YYYY-MM-DD HH:mm:ss[]
 * time: 时间 HH:mm:ss
 * digit: 数字
 * component 自定义组件
 */
export type ValueType =
  | 'text'
  | 'selector'
  | 'checkbox'
  | 'component'
  | 'datePicker'
  | 'rangePicker'
  | 'time'
  | 'digit';

/**
 * form子项
 */
export interface FilterFormItemProps extends Omit<FormItemProps, 'children'> {
  /**
   * 输入值类型
   */
  valueType?: ValueType;
  /**
   * label名称
   */
  title?: ReactNode | string;
  /**
   * 属性值
   */
  dataIndex?: string;

  /**
   * 默认值
   */
  initialValue?: any;

  /**
   * 选择器option
   */
  selectOptions?: {
    value: string | number;
    label: string;
  }[];
  /**
   * formItem自带属性
   */
  formItemProps?: { [prop: string]: any };

  /**
   * item自带属性，比如Input的属性，DatePicker的属性等
   */
  itemProps?: { [prop: string]: any };

  /**
   * form 的排序
   */
  order?: number;

  /**
   * 占位符
   */
  placeholder?: string;

  /**
   * 自定义组件,自定义组件必须在组件内部绑定onChange事件使form能够获取对应数据，ref属性提供给formItem绑定，获取对应组件的实例
   */
  component?: (rest: any, ref: any) => ReactElement;
  /**
   * 控制隐藏,内置属性，不需要传入
   */
  hidden?: boolean;
}

export interface FilterFormProps<T> extends Omit<FormItemProps, 'children' | 'onReset'> {
  formItems: FilterFormItemProps[];
  onSubmit?: (value: T) => void;
  onReset?: (value: T) => void;
  /**
   * 需求关联处理时，监听每个value的变化
   */
  onValueChange?: (changedValues: T, allValues: T) => void;
  /**
   * ant-from自身属性
   */
  form?: Omit<FormProps, 'form'>;
  search?: boolean | SearchConfig;
  /**
   * 需求关联或者直接对form处理时，获取form实例
   */
  formRef?: React.MutableRefObject<FormInstance | undefined>;
  /**
   * 点击展开和收起时触发回调
   */
  onCollapseChange?: () => void;
}
