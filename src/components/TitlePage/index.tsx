import React from 'react';
import styles from './index.scss';

const TitlePage = ({ title, ...rest }: any) => {
  return (
    <div {...rest} className={styles.content}>
      {title}
    </div>
  );
};

export default TitlePage;
