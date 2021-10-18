import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import SiderBar from './SiderBar';
import styles from './BasicLayout.scss';

const { Content } = Layout;

interface BasicLayoutProps {
  children: any;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className={styles.basicLayout}>
      <SiderBar collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} />
      <Layout className={collapsed ? styles.collapsed : styles.default}>
        <Header />
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
