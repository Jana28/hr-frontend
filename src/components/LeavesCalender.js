import React from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export function LeavesCalender({ isMultiple, leaves }) {
  console.log("leaves", leaves)
  console.log("isMultiple", isMultiple)
  const min = new Date();
  min.setHours(0, 0, 0);
  const max = new Date();
  max.setHours(23, 59, 59);

  return (  
        <Calendar
            style={{
                height: "500px",
                width: `${isMultiple ? "1550px" :"800px"}`,
            }}
            defaultDate={moment().toDate()}
            defaultView="month"
            titleAccessor={(leave) =>
              `${isMultiple ? `${leave.employee.email} | ` : ""}${leave.leavereason.description}`
            }
            startAccessor={(leave) =>
              new Date(leave.startDate)
            }
            endAccessor={(leave) =>
              new Date(leave.endDate)
            }
            eventPropGetter={(leave, start, end, isSelected) => {
              const newStyle = {
                backgroundColor: "#3174ad",
                border: "1px solid #d3d3d3",
              };
              return {
                className: "",
                style: newStyle,
              };
            }}
            min={min}
            max={max}
            step={15}
            events={leaves}
            localizer={localizer}
            scrollToTime={moment().toDate()}
            showMultiDayTimes
            views={['month', 'agenda']}
            popup={true}
        />
  );
}
