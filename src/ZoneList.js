import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';
import SensorList from './SensorList';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
var ReceivedZoneObjects = [];

export default function ZoneList(props) {
  const classes = useStyles();
  var zoneCheckBoxList =[];
  var sensorData = [];
  // console.log("props len is " + props.zoneData.length)
  
  for(var i=0;i<props.zoneData.length;i++)
  {
      zoneCheckBoxList[i] =  {  zone:props.zoneData[i].zone, checked:true }
      sensorData = sensorData.concat(props.zoneData[i].sensorArray)
      ReceivedZoneObjects.push(props.zoneData[i])
  }

  const [state, setState] = React.useState({
    zoneList: zoneCheckBoxList,
    sensorArray: sensorData
   });

   useEffect(() => {
    var zoneCheckBoxList =[];
    var sensorData = [];
    for (var i=0;i<props.zoneData.length;i++)
    {
      // console.log("hello")
      zoneCheckBoxList[i] =  {zone: props.zoneData[i].zone, checked: true};
      sensorData = sensorData.concat(props.zoneData[i].sensorArray)
      ReceivedZoneObjects.push(props.zoneData[i])
    }
    setState({...state, zoneList :zoneCheckBoxList, sensorArray: sensorData})
  }, [props.zoneData]);



  const handleChange = name => event => {
    // console.log(event.target.checked)
    state.zoneList[name].checked = event.target.checked
    
  
    var checkedZoneSensorArray=[];
    for(var i=0;i<state.zoneList.length;i++)
    {
      if (state.zoneList[i].checked == true)
      {
        checkedZoneSensorArray = checkedZoneSensorArray.concat(ReceivedZoneObjects[i].sensorArray);
      }
    }
    setState({zoneList: state.zoneList, sensorArray: checkedZoneSensorArray})
    // console.log("after handling chagne, state is: " + JSON.stringify(state))
  };

  var temp=[];
  var currentFloor='';
  var currentBuilding='';
  var currentCampus ='';
  for(var i=0;i<state.zoneList.length;i++)
  {
    if(props.zoneData[i])
    {
      if(props.zoneData[i].floor == currentFloor 
        && props.zoneData[i].building == currentBuilding 
        && props.zoneData[i].campus == currentCampus)
      {
        temp.push(
          <FormControlLabel
          control={<Checkbox checked={state.zoneList[i].checked} onChange={handleChange(i)}  />}
          label={state.zoneList[i].zone}
        />
        )
      }
      else
      {
        currentFloor=props.zoneData[i].floor;
        currentBuilding=props.zoneData[i].building;
        currentCampus=props.zoneData[i].campus;
        temp.push(
          <div>
              <FormHelperText>{"Floor " + currentFloor+ ", "+currentBuilding + ", " + currentCampus  }</FormHelperText>
          <FormControlLabel
          control={<Checkbox checked={state.zoneList[i].checked} onChange={handleChange(i)}  />}
          label={state.zoneList[i].zone}
        />
        </div>
        )
      }
        // temp.push(
        //   <FormControlLabel
        //   control={<Checkbox checked={state.floorList[i].checked} onChange={handleChange(i)}  />}
        //   label={state.floorList[i].floor}
        // />
        // )
    }
  }

 const onSubmit= event =>{
      console.log("Button clicked")
      console.log("zonelist and its state" + JSON.stringify(zoneCheckBoxList))
  }
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
      <div>

        <div className={classes.root} style={{display: "inline-block" ,overflow: "auto",height:"250px"}}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Zone List</FormLabel>
            <FormGroup>
            {temp}
            
            </FormGroup>
            <FormHelperText>Choose Zone</FormHelperText>
        </FormControl>
        
        </div>
        <div style={{display: "inline-block"}}>
            <SensorList sensorData={state.sensorArray} label={props.label}></SensorList>
        </div>
        {/* <div>
            <Button onClick={onSubmit}>Submit</Button>
        </div> */}

    </div>
  );
}