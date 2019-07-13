//Code taken directly from Material_Ui . 
// Refer its webiste for complete API and documentation of this feature
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

  const classes = useStyles();

  window.clientQuery.endTime = selectedDate;

  function handleDateChange(date) {
    setSelectedDate(date);
    window.clientQuery.endTime = date;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={classes.grid} justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="mui-pickers-date"
          label="Select End Date"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="mui-pickers-time"
          label="Select End Time"
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
