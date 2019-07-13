import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));



export default function InputLabelTextField(props) {//a function to render textfield for each Label
  //of the InputHomePage component and then intialise the gloabl variable clientQuery.sensorListArray with
  // these labels 
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    window.clientQuery.sensorList_Array[props.label].label=event.target.value // the initialisation
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="standard-name"
        label="Add a Label"
        className={classes.textField}
        value={values.name}
        onChange={handleChange('name')}
        margin="normal"
      />
      
    </form>
  );
}