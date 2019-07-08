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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
var ReceivedFloorObjects = [];

export default function FloorList(props) {
  const classes = useStyles();
  var floorCheckBoxList =[];
  var zoneData = [];
  console.log("floor props are  + " + JSON.stringify(props.floorData));
  
  for(var i=0;i<props.floorData.length;i++)
  {
      floorCheckBoxList[i] =  {  floor:props.floorData[i].floor, checked:true }
      zoneData = zoneData.concat(props.floorData[i].zoneArray)
      ReceivedFloorObjects.push(props.floorData[i])
  }

  const [state, setState] = React.useState({
   floorList: floorCheckBoxList,
   zoneArray: zoneData
  });

  useEffect(() => {
    var floorCheckBoxList =[];
    var zoneData = [];
    for (var i=0;i<props.floorData.length;i++)
    {
      // console.log("hello")
      floorCheckBoxList[i] =  {floor: props.floorData[i].floor, checked: true};
      zoneData = zoneData.concat(props.floorData[i].zoneArray)
      ReceivedFloorObjects.push(props.floorData[i])
    }
    setState({...state, floorList :floorCheckBoxList, zoneArray: zoneData})
  }, [props.floorData])


  const handleChange = name => event => {
    // console.log(event.target.checked)
    state.floorList[name].checked = event.target.checked
    
  
    var checkedFloorZoneArray=[];
    for(var i=0;i<state.floorList.length;i++)
    {
      if (state.floorList[i].checked == true)
      {
        checkedFloorZoneArray = checkedFloorZoneArray.concat(ReceivedFloorObjects[i].zoneArray);
      }
    }
    setState({floorList: state.floorList, zoneArray: checkedFloorZoneArray})
    // console.log("after handling chagne, state is: " + JSON.stringify(state))
  };
  



  var temp=[];
  var currentBuilding='';
  var currentCampus=''
  for(var i=0;i<state.floorList.length;i++)
  {
    if(props.floorData[i])
    {
      if(props.floorData[i].building == currentBuilding 
        && props.floorData[i].campus ==currentCampus)
      {
        temp.push(
          <FormControlLabel
          control={<Checkbox checked={state.floorList[i].checked} onChange={handleChange(i)}  />}
          label={state.floorList[i].floor}
        />
        )
      }
      else
      {
        currentBuilding=props.floorData[i].building
        currentCampus = props.floorData[i].campus
        temp.push(
          <div>
              <FormHelperText>{currentBuilding + ", " + currentCampus}</FormHelperText>
          <FormControlLabel
          control={<Checkbox checked={state.floorList[i].checked} onChange={handleChange(i)}  />}
          label={state.floorList[i].floor}
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
      console.log("floorlist and its state" + JSON.stringify(floorCheckBoxList))
  }
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
      <div>
          
        <div className={classes.root} style={{display: "inline-block",overflow: "auto",height:"250px"}}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Floor List</FormLabel>
            <FormGroup>
            {temp}
            
            </FormGroup>
            <FormHelperText>Choose your Floor</FormHelperText>
        </FormControl>
        
        </div>
        <div style={{display: "inline-block"}}>
            <ZoneList zoneData={state.zoneArray} label={props.label}></ZoneList>
        </div>
        {/* <div>
            <Button onClick={onSubmit}>Submit</Button>
        </div> */}

    </div>
  );
}