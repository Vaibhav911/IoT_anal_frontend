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

export default function SelectSensorType(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    sensorType: ''
  });
  // window.clientQuery.sensorList_Array[props.label].sensorType = values.sensorType;
  console.log("My sensordATA type index is" + props.label)


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
    // conbsole
    window.clientQuery.sensorList_Array[props.label].sensorType = event.target.value;

    console.log("The sensor name  is " + event.target.name)
    console.log("The sensor type is " + event.target.value)
    console.log("Length of client Query object is +" + window.clientQuery.sensorList_Array.length)
    console.log("client query obj is +" + JSON.stringify(window.clientQuery.sensorList_Array[props.label] + " length is index"+ props.label))

    // window.clientQuery.frequency = event.target.value

  }

  return (
    <form className={classes.root} autoComplete="off">
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="sensorType-helper">Sensor Type</InputLabel>
        <Select
          value={values.sensorType}
          onChange={handleChange}
          input={<Input name="sensorType" id="SensorType-helper" />}
        >
          <MenuItem value="">
            <em>Select Sensor Type</em>
          </MenuItem>
          <MenuItem value='thl'>THL</MenuItem>
          <MenuItem value='parking'>Parking</MenuItem>
          <MenuItem value='aqi'>AQI</MenuItem>
          <MenuItem value='ppm'>PPM</MenuItem>
          
        </Select>
        <FormHelperText>Select any Sensor Type</FormHelperText>
      </FormControl>
      
    
    </form>
  );
}