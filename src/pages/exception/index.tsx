import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Exception = () => {
  return (
    <div>
      <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link>
    </div>
  );
};

export default Exception;
