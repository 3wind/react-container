import { Layout } from 'antd';
import React from 'react';
import styles from './Header.scss';

const { Header: AntHeader } = Layout;

const Header = () => {
  return <AntHeader className={styles.header}></AntHeader>;
};

export default Header;
