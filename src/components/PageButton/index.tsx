import * as React from 'react';
import { debounce } from 'lodash';
import { Button } from 'antd';
import { IProps } from './type';

import './index.less';

const prefixCls = 'page';
const PageButton: React.FC<IProps> = (props) => {
  const {
    label,
    disabled,
    disabledFilterDataLevel,
    onClick,
    children,
    filterDataLevel,
    delay,
    loading,
    style,
    buttonType,
    className,
    ...remainingProps
  } = props;

  const handleClick = debounce(() => {
    onClick && onClick();
  }, delay);

  const newDisabled = () => {
    if (disabled !== undefined) {
      return disabled;
    }
    if (filterDataLevel === undefined) {
      return false;
    }
    if (Array.isArray(disabledFilterDataLevel)) {
      return disabledFilterDataLevel.includes(filterDataLevel);
    } else {
      return disabledFilterDataLevel === filterDataLevel;
    }
  };
  return (
    <>
      {buttonType === 'SubmitButton' ? (
        <Button
          type="primary"
          style={style ? style : {}}
          {...remainingProps}
          disabled={newDisabled()}
          loading={loading}
          onClick={handleClick}
          className={`${prefixCls}-submitButton ${className || ''}`}
        >
          {children || label}
        </Button>
      ) : (
        <button
          className={`${prefixCls}-tableButton ${className || ''}`}
          style={style ? style : {}}
          onClick={props.handleRoute ? props.handleRoute : props.onClick}
          disabled={newDisabled()}
        >
          {React.Children.toArray(props.children)}
        </button>
      )}
    </>
  );
};

PageButton.defaultProps = {
  label: '确定',
  delay: 150,
};

export default PageButton;
