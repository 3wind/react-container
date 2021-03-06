import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

const MomentDemo = () => {
  const time = new Date();
  console.log(time);
  // let isLimitTime = moment().format('YYYYMMDD') > currentDate.format('YYYYMMDD') || currentDate.format('YYYYMMDD') > moment().add(1, 'days').format('YYYYMMDD')
  //             return isLimitTime
  const onChange = (date: any, dateString: string) => {
    console.log(
      'date, dateString',
      // date,
      // dateString,
      // new Date(date),
      // moment(date).unix(),
      // new Date(date).getTime(),
      // moment().format('YYYYMMDD'),
      // moment().add(1, 'days').format('YYYYMMDD'),
      moment(moment().format("YYYYMMDD"), 'YYYYMMDD').format('E'),
    );
  };
  return (
    <div style={{ padding: 24 }}>
      <div>当前时间：{time.toString()}</div>
      <div>当前时间秒值：{moment(time).unix().toString()}</div>
      <div>当前时间毫秒值：{moment(time).valueOf().toString()}</div>
      <div>YYYY-MM-DD：{moment(time).format('YYYY-MM-DD').toString()}</div>
      <div>yyyy-MM-dd HH:mm:ss：{moment(time).format('YYYY-MM-DD HH:mm:ss').toString()}</div>
      <div>
        MMMM Do YYYY, h:mm:ss a：{moment(time).format('MMMM Do YYYY, h:mm:ss a').toString()}
      </div>
      <div>当前时间与2021年1月1号相差时间：{moment(time).from('2021-01-03').toString()}</div>
      <div>
        <DatePicker
          onChange={onChange}
          disabledDate={(currentDate: any) => {
            if (true) {
              const indexOfWeekEnd: any = moment(
                moment().format("YYYYMMDD"),
                "YYYYMMDD"
              ).format("E");
              const end = moment(moment().format("YYYYMMDD"), "YYYYMMDD").add(
                7 - indexOfWeekEnd,
                "days"
              ); // 周日
              return (
                currentDate.format("YYYYMMDD") < moment().format("YYYYMMDD") ||
                currentDate.format("YYYYMMDD") > end.format("YYYYMMDD")
              );
            } else {
            let isLimitTime =
              moment().format('YYYYMMDD') > currentDate.format('YYYYMMDD') ||
              currentDate.format('YYYYMMDD') > moment().add(1, 'days').format('YYYYMMDD');
            return isLimitTime;
            }
          }}
        />
      </div>
    </div>
  );
  //   return <div>{moment(moment(1638343774).format('YYYY-MM-DD'), 'YYYY-MM-DD')}</div>;
};
export default MomentDemo;
