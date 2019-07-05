import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import SensorList from './SensorList';
import ZoneList from './ZoneList'
import FloorList from './FloorList'
import BuildingList from './BuildingList'
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default  function NewCampusList(props) {
  const classes = useStyles();
  var campusList =[];


useEffect(() =>
{
    console.log("We are inside useEffect")
    axios.get("http://localhost:5000/campusData").then(res=> {
        console.log("the campus data:" + JSON.stringify(res.data))
        for(var i=0;i<res.data.campusList.length;i++)
          {
              campusList.push(
                  {
                      campus:res.data.campusList[i],
                      checked:true
                  }
              )
          }
          console.log("iN afteruseEffect: " + JSON.stringify(campusList))
    })
    
})


  
  console.log("props" + JSON.stringify (props));
  var campusId=props.campusId
  const [state, setState] = React.useState({
   campusCheckBoxList :campusList
  });
  console.log("the state is:" + JSON.stringify(state))

  const handleChange = name => event => {
      console.log("name is " + name)
      console.log(event.target.checked)
      campusCheckBoxList[name].checked = event.target.checked
    setState({ ...state,[ campusCheckBoxList] : campusCheckBoxList });
    console.log("campuscheckboxlist name Obj "+ JSON.stringify(campusCheckBoxList[name]))
    // console.log("campuscheckboxlist Obj "+ JSON.stringify(campusCheckBoxList))
  };

  const { campusCheckBoxList } = state;

  var temp=[];
  for(var i=0;i<campusCheckBoxList.length;i++)
  {
      temp.push(
        <FormControlLabel
        control={<Checkbox checked={campusCheckBoxList[i].checked} onChange={handleChange(i)}  />}
        label={campusCheckBoxList[i].campus}
      />
      )
  }
 const onSubmit= event =>{
      console.log("Button clicked")
      console.log("campuslist and its state" + JSON.stringify(campusCheckBoxList))
  }
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;


 
    console.log("After Await")
    return (
        <div>
            
          <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Campus List</FormLabel>
              <FormGroup>
              {temp}
              
              </FormGroup>
              <FormHelperText>Be careful</FormHelperText>
          </FormControl>
          <BuildingList buildings={['31','32','33']}></BuildingList>
          </div>
          <div>
              
          </div>
          {/* <div>
              <Button onClick={onSubmit}>Submit</Button>
          </div> */}
  
      </div>
    );
    



  return (
      <div>
          
        <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Campus List</FormLabel>
            <FormGroup>
            {temp}
            
            </FormGroup>
            <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <BuildingList buildings={['31','32','33']}></BuildingList>
        </div>
        <div>
            
        </div>
        {/* <div>
            <Button onClick={onSubmit}>Submit</Button>
        </div> */}

    </div>
  );
}