import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import logo from '@/assets/doc.svg';
import routes from '@/route/index';
import { menuItems } from './items';
import styles from './index.scss';
import { withRouter } from 'react-router';
import { getOpenKeys } from './utils';
import { uniq } from 'lodash';

const { Sider } = Layout;

interface SiderBarProps {
  collapsed: boolean;
  setCollapsed: Function;
  history: any;
  location: any;
  match: any;
}

const SiderBar: React.FC<SiderBarProps> = ({
  collapsed,
  setCollapsed,
  location,
}) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const currentOpenKeys: string[] = [];
    // 获取当前路径的父级path数组
    getOpenKeys(location.pathname, routes, currentOpenKeys);
    setOpenKeys(uniq(openKeys.concat(currentOpenKeys)));
    setSelectedKeys([location.pathname]);
  }, [location]);

  const onOpenChange = useCallback(
    (keys) => {
      setOpenKeys(keys);
    },
    [setOpenKeys],
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => setCollapsed()}
      className={styles.siderBar}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 24,
      }}
    >
      <div className={styles.title}>
        <img src={logo} className={styles.logo} alt="" />
        {!collapsed ? <span className={styles.titleName}>React Container</span> : null}
      </div>

      <Menu
        className={styles.menu}
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
      >
        {menuItems(routes)}
      </Menu>
    </Sider>
  );
};

export default withRouter(SiderBar);
