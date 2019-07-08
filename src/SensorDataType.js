import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

window.sensorDataType = 'quantitative'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SensorDataType() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sensorDataType: 'quantitative'
  });

  const inputLabel = React.useRef(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The sensor data type  is " + event.target.value)
    window.sensorDataType = event.target.value;

    
    // window.clientQuery.frequency = event.target.value

  }

  return (
    <form className={classes.root} autoComplete="off">
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="sensordatatype-helper">Sensor Data type</InputLabel>
        <Select
          value={values.sensorDataType}
          onChange={handleChange}
          input={<Input name="sensorDataType" id="sensordatatype-helper" />}
        >
        
          <MenuItem value='qualitative'>Qualitative</MenuItem>
          <MenuItem value='quantitative'>Quantitative</MenuItem>
          
          
        </Select>
        <FormHelperText>Select  Sensor Data Type</FormHelperText>
      </FormControl>
      
    
    </form>
  );
}