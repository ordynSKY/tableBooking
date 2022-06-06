import React from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const Cal = (props) => {
  return (
    <Calendar
      value={props.selectedDate}
      onChange={props.handleDateChange}
      shouldHighlightWeekends
    />
  );
};

export default Cal;
