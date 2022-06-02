import React from "react";
import "date-fns";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function Calendar(props) {
  return (
    <div className="calendar__second">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            // disableToolbar
            variant="dialog"
            format="dd-MM-yyyy"
            margin="normal"
            id="date-picker"
            label="Select Date"
            value={props.selectedDate}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change-date",
            }}
          />

          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Select Time"
            format="hh:mm"
            value={props.selectedDate}
            onChange={props.handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change-date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
}

export default Calendar;
