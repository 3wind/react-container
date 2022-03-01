import { BaseButtonProps } from 'antd/lib/button/button.d';

export interface IProps extends BaseButtonProps {
  /**当有包裹 children 时 忽略 label*/
  children?: any;
  /**展示文案*/
  label?: string;
  /**禁止点击*/
  disabled?: boolean;
  /**debounce delay 时间*/
  delay?: number;
  /**点击事件*/
  onClick: (params?: any) => void;
  /**禁止点击的层级*/
  disabledFilterDataLevel?: number | number[];
  /**全局筛选器 网点level*/
  filterDataLevel?: number;
  /**是否是路由跳转*/
  handleRoute?: () => any;
  /**自定义样式*/
  style?: any;
  /**设置按钮载入状态*/
  loading?: boolean;
  /**按钮类型*/
  buttonType: string;
  //类名
  className?: string;
}
