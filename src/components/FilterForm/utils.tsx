import React from 'react';
import { defaultSearch } from './constants';
import { SearchConfig } from './interface';
import { DownOutlined } from '@ant-design/icons';

/**
 * 获取布局配置
 */
export const getDefaultSearch = (search: boolean | SearchConfig | undefined): SearchConfig => {
  const config = {
    collapseRender: (collapsed: boolean) => {
      if (collapsed) {
        return (
          <>
            {'展开更多'}
            <DownOutlined
              style={{
                marginLeft: '2px',
                transition: '0.3s all',
                transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
                fontSize: '12px',
                color: '#2863FA',
              }}
            />
          </>
        );
      }
      return (
        <>
          {'收起'}
          <DownOutlined
            style={{
              marginLeft: '2px',
              transition: '0.3s all',
              transform: `rotate(${collapsed ? 0 : 0.5}turn)`,
              fontSize: '12px',
              color: '#2863FA',
            }}
          />
        </>
      );
    },
  };
  if (search === undefined || search === true) {
    return { ...defaultSearch, ...config };
  }

  return { ...defaultSearch, config, ...search } as Required<SearchConfig>;
};

/**
 * 获取最后一行的 offset，保证在最后一列
 * @param length
 * @param span
 */
export const getOffset = (length: number, span: number = 8) => {
  // 24/5不是整数，特殊处理
  const cols = Math.ceil(24 / span);
  return (cols - 1 - (length % cols)) * span;
};

/**
 * w<1268px，内容固定，浏览器横向滑动显示内容；
 * 1268≤w≤1440px，默认一行3个，每个占内容区域1/3；
 * 1440<w≤1920，默认一行4个，每个占内容去域1/4；
 * w>1920，默认一行5个，每个占内容区域1/5；
 */
export const getColSpan = (width: number): number => {
  if (width >= 1920) {
    return 5;
  }
  if (width > 1440 && width < 1920) {
    return 6;
  }
  if (width >= 1280 && width <= 1440) {
    return 8;
  }
  return 8;
};
