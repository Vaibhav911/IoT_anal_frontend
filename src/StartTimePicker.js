import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles({
  grid: {
    width: "60%"
  }
});

export default function StartTimePicker() {//this fucntion is used to render time picker and initialise the 
  // global variable clientQuery with its endTime attribute. Refer Material UI for more info.
  const [selectedDate, setSelectedDate] = React.useState(new Date(Date.now())); 

  window.clientQuery.startTime = selectedDate;

  const classes = useStyles();

  function handleDateChange(date) {
    setSelectedDate(date);
    window.clientQuery.startTime = date;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="mui-pickers-date"
          label="Select Start Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="mui-pickers-time"
          label="Select Start Time"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change time"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
