import React from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';
import { RouteProps } from '@/route';

const renderTitle = (name: string, icon: Node) => (
  <>
    {!!icon ? icon : null}
    <span>{name}</span>
  </>
);

export const menuItems: any = (routes: RouteProps[]) => {
  return routes
    .filter((route) => !route.hidden)
    .reduce((menus, { name, path, icon, children, disabled }) => {
      // 无 children 则当前为可点击 Menu
      if (!children) {
        return menus.concat(
          <MenuItem key={path} disabled={disabled}>
            <Link to={path}>{renderTitle(name, icon)}</Link>
          </MenuItem>,
        );
      }

      const childrenNodes = menuItems(children);
      // 有子节点则渲染 SubMenu
      if (childrenNodes.length) {
        return menus.concat(
          <SubMenu key={path} title={renderTitle(name, icon)}>
            {childrenNodes}
          </SubMenu>,
        );
      }

      return menus.concat(
        <MenuItem key={path} disabled={disabled}>
          <Link to={path}>{renderTitle(name, icon)}</Link>
        </MenuItem>,
      );
    }, []);
};
