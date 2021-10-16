import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '@/asset/doc.svg';
import routes from '@/route/index';
import styles from './index.scss';
import { menuItems } from './items';

const { Sider } = Layout;

interface SiderBarProps {
  collapsed: boolean;
  setCollapsed: Function;
}

const SiderBar = ({ collapsed, setCollapsed }: SiderBarProps) => {
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
      {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">nav 1</Menu.Item>
      </Menu> */}

      <Menu
        className={styles.menu}
        mode="inline"
        theme="dark"
        // openKeys={openKeys}
        // selectedKeys={selectedKeys}
        // onOpenChange={onOpenChange}
      >
        {menuItems(routes)}
      </Menu>
    </Sider>
  );
};

export default SiderBar;
