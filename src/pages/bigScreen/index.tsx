import React from 'react';
import './index.less'

const BigScreen = () => {
  return (
    <div className="big-screen-dashboard">
      <div className="content">
        <div className="box-left">
          <div className="search-box">search-box</div>
          <div className="l-top">l-top</div>
          <div className="l-middle">l-middle</div>
          <div className="l-bottom">l-bottom</div>
        </div>
        <div className="box-center">
          <div className="title-box">title-box</div>
          <div className="c-map">c-map</div>
          <div className="c-bottom">c-bottom</div>
        </div>
        <div className="box-right">
          <div className="r-top">r-top</div>
          <div className="r-middle">r-middle</div>
          <div className="r-bottom">r-bottom</div>
        </div>
      </div>
    </div>
  );
};
export default BigScreen;
