import { Alert } from 'antd';
import React from 'react';
import Loading from '@/components/Loading';

const AsyncLoading = ({ error, timedOut, pastDelay, retry }: any) => {
  if (error) {
    return <Alert message={error.message} type="error" closeText="重试" onClose={retry} />;
  }
  if (timedOut) {
    return <Alert message="网络超时" type="warning" closeText="重试" onClose={retry} />;
  }
  if (pastDelay) {
    return <Loading />;
  }
  return null;
};

export default AsyncLoading;
