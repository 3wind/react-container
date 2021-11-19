import React from 'react';
import FullCalendar, { DateSelectArg, EventDropArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import styles from './index.scss';

const DemoApp = () => {
  const getCalendarData = (
    fetchInfo: {
      start: Date;
      end: Date;
      startStr: string;
      endStr: string;
      timeZone: string;
    },
    successCallback: (events: EventInput[]) => void,
    failureCallback: (error: any) => void,
  ) => {
    console.log(
      'fetchInfo, successCallback, failureCallback',
      fetchInfo,
      successCallback,
      failureCallback,
    );
  };

  // 拖拽事件
  const eventDrop = (eventDropInfo: EventDropArg) => {
    console.log('eventDrop', eventDropInfo);
  };

  // 点击日历
  const dateClick = (DateClickInfo: DateClickArg) => {
    console.log('dateClick', DateClickInfo);
  };

  // 选中日历
  const handleDateSelect = (DateSelectInfo: DateSelectArg) => {
    console.log('handleDateSelect', DateSelectInfo);
  };

  return (
    <div className={styles.demoApp}>
      <div className={styles.main}>
        <FullCalendar
          locale="zh-cn"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          firstDay={1}
          headerToolbar={{
            // 顶部工具栏设置
            start: 'today',
            center: 'prev,title,next',
            end: '',
          }}
          buttonText={{
            today: '返回今天',
          }}
          events={(fetchInfo, successCallback, failureCallback) =>
            getCalendarData(fetchInfo, successCallback, failureCallback)
          }
          editable={false} // 确定是否可以修改日历上的事件
          fixedWeekCount={false} // 确定在月视图中显示的星期数
          selectable={true}
          dayMaxEvents={true} // 日期内最大活动数量
          moreLinkContent={({ num }) => <span>还有{num}项...</span>} // 更多显示
          eventBorderColor="rgba(64, 169, 255, 0.4)" // 事件框边框
          eventBackgroundColor="rgba(64, 169, 255, 0.4)" // 事件框背景色
          eventDisplay="block" // 事件展示形式框
          eventTextColor="#222" // 事件文本颜色
          eventDrop={eventDrop}
          dateClick={dateClick}
          select={handleDateSelect} // 选中事件
        />
      </div>
    </div>
  );
};

export default DemoApp;
