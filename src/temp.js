import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();
  console.log("props" + JSON.stringify (props));
  var sensorId=props.sensorId
  const [state, setState] = React.useState({
    sensorId : true
  });

  const handleChange = name => event => {
      console.log("name is " + name)
      console.log(event.target.checked)
    setState({ ...state, [name]: event.target.checked });
  };

  const { sensor } = state;
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Assign responsibility</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={sensor} onChange={handleChange(sensorId)}  />}
            label={1}
          />
         
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
      
    </div>
  );
}