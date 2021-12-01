import React, { useEffect, useState } from 'react';
import { getUserInfoAPI } from '@/services/permission';
import { useRequest } from 'ahooks';
import styles from './index.scss';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userName: '',
  });

  useEffect(() => {
    getUserInfo.run();
  }, []);
  
  const getUserInfo = useRequest(() => getUserInfoAPI(), {
    manual: true,
    onSuccess(data: any) {
      console.log('getUserInfoAPI success', data);
      setUserInfo(data);
    },
    onError(err) {
      console.log('getUserInfoAPI err', err);
    },
  });

  return (
    <div className={styles.dashboard}>
      <div>首页</div>
      <div>欢迎：{userInfo.userName}</div>
    </div>
  );
};
export default Dashboard;
