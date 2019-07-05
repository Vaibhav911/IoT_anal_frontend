import React,  {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
var ReceivedSensorObjects = [];

export default function SensorList(props) {
  const classes = useStyles();
  var sensorCheckBoxList = [];

  for(var i=0;i<props.sensorData.length;i++)
  {
      sensorCheckBoxList[i] =  {  sensor:props.sensorData[i].sensorId, checked:true }
  }

  const [state, setState] = React.useState({
    sensorList: sensorCheckBoxList
   });

   useEffect(() => {
    console.log("My Index is" +  props.label)

    var sensorCheckBoxList =[];
    for (var i=0;i<props.sensorData.length;i++)
    {
      sensorCheckBoxList[i] =  {sensor: props.sensorData[i].sensorId, checked: true};
    }

    
    setState({...state, sensorList :sensorCheckBoxList})

    var checkedSensorLables = [];
    for (var i=0;i<state.sensorList.length;i++)
    {
      if (state.sensorList[i].checked == true)
      {
        checkedSensorLables.push(state.sensorList[i].sensor)
      }
    }
    window.clientQuery.sensorList_Array[props.label].sensorList = checkedSensorLables;

  }, [props.sensorData]);

  const handleChange = name => event => {

    // state.sensorList[name].checked = event.target.checked;
    var sensorList = state.sensorList;
    sensorList[name].checked = event.target.checked;
    setState({ ...state, sensorList: sensorList });
    // var checkedSensorArray=[];
    // for(var i=0;i<state.sensorList.length;i++)
    // {
    //   if (state.sensorList[i].checked == true)
    //   {
    //     checkedZoneSensorArray = checkedZoneSensorArray.concat(ReceivedZoneObjects[i].sensorArray);
    //   }
    // }
    // setState({zoneList: state.zoneList, sensorArray: checkedZoneSensorArray})
    // console.log("after handling chagne, state is: " + JSON.stringify(state))
    var checkedSensorLables = [];
    for (var i=0;i<state.sensorList.length;i++)
    {
      if (state.sensorList[i].checked == true)
      {
        checkedSensorLables.push(state.sensorList[i].sensor)
      }
    }
    window.clientQuery.sensorList_Array[props.label].sensorList = checkedSensorLables;


    // console.log('value of myVar is ' + window.myVar)
  };
  // const { sensorCheckBoxList } = state;

  var temp=[];
  var currentZone='';
  var currentFloor='';
  var currentBuilding='';
  var currentCampus ='';
  for(var i=0;i<state.sensorList.length;i++)
  {
    if(props.sensorData[i])
    {
      if(props.sensorData[i].zone == currentZone
        && props.sensorData[i].floor == currentFloor
        && props.sensorData[i].building == currentBuilding
        && props.sensorData[i].campus == currentCampus )
       
      {
        temp.push(
          <FormControlLabel
          control={<Checkbox checked={state.sensorList[i].checked} color='primary' onChange={handleChange(i)}  />}
          label={state.sensorList[i].sensor + "-" + props.sensorData[i].type}
        />
        )
      }
      else
      {
        currentZone=props.sensorData[i].zone
        currentFloor=props.sensorData[i].floor;
        currentBuilding=props.sensorData[i].building;
        currentCampus=props.sensorData[i].campus;
        
        temp.push(
          <div>
              <FormHelperText>{currentZone + ",Floor " + currentFloor+ ", "+currentBuilding + ", " + currentCampus}</FormHelperText>
          <FormControlLabel
          control={<Checkbox checked={state.sensorList[i].checked} color='primary' onChange={handleChange(i)}  />}
          label={state.sensorList[i].sensor + "-" + props.sensorData[i].type}
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
//  const onSubmit= event =>{
//       console.log("Button clicked")
//       console.log("sensorlist and its state" + JSON.stringify(sensorCheckBoxList))
//   }
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
      <div>
        <div className={classes.root} style={{display: "inline-block", overflow: "auto",height:"250px"}}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Sensor List</FormLabel>
            <FormGroup >
            {temp}
            
            </FormGroup>
            <FormHelperText>Choose Sensor</FormHelperText>
        </FormControl>
        </div>
        {/* <div style={{display: "inline-block"}}>
            <Button onClick={onSubmit}>Submit</Button>
        </div> */}
    </div>
  );
}