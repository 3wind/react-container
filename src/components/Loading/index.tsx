import React from 'react';
import { Spin } from 'antd';
import styles from './index.scss';

const Loading = () => <Spin className={styles.container} size="large" />;

export default Loading;
