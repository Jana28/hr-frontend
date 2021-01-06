import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CardContent, Dialog, Typography } from "@material-ui/core";

const DetailsDialog = ({ employeeHoliday, open, onClose }) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <CardContent>
                <Typography variant="h6">Reason for working on {employeeHoliday.holiday.name}:</Typography>
                <Typography>{employeeHoliday.workreason.description}</Typography>  
            </CardContent>
        </Dialog>
    );
};

const localizer = momentLocalizer(moment);

export function EmployeeHolidaysCalender({ isMultiple, employeeHolidays }) {
    console.log("employeeHolidays", employeeHolidays)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [details, setDetails] = useState();
    const [scrollToTimeDate, setScrollToTimeDate] = useState(
        moment().toDate()
    );
    const min = new Date();
    min.setHours(0, 0, 0);
    const max = new Date();
    max.setHours(23, 59, 59);

    return (  
        <>
            <Calendar
                style={{
                    height: "500px",
                    width: `${isMultiple ? "1550px" :"800px"}`,
                }}
                defaultDate={moment().toDate()}
                defaultView="month"
                titleAccessor={(employeeHoliday) =>
                    `${isMultiple ? `${employeeHoliday.employee.email} | ` : ""}${employeeHoliday.holiday.name}`
                }
                startAccessor={(employeeHoliday) =>
                    new Date(employeeHoliday.holiday.startDate)
                }
                endAccessor={(employeeHoliday) =>
                    new Date(employeeHoliday.holiday.endDate)
                }
                eventPropGetter={(employeeHoliday, start, end, isSelected) => {
                    const newStyle = {
                        backgroundColor: "#3174ad",
                        border: "1px solid #d3d3d3",
                    };
                    return {
                        className: "",
                        style: newStyle,
                    };
                }}
                onSelectEvent={(employeeHoliday) => {
                    setScrollToTimeDate(employeeHoliday.holiday.startDate);
                    setDetails(employeeHoliday);
                    setIsDialogOpen(true);
                  }}
                min={min}
                max={max}
                step={15}
                events={employeeHolidays}
                localizer={localizer}
                scrollToTime={scrollToTimeDate}
                showMultiDayTimes
                views={['month', 'agenda']}
                popup={true}
            />
            {details && (
                <DetailsDialog
                    employeeHoliday={details}
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
            )}
            </>
    );
}
