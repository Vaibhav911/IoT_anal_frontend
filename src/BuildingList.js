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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
var ReceivedBuildingObjects = [];


export default function BuildingList(props) {
  // console.log("creating buildingist, prps is " + JSON.stringify(props))
  const classes = useStyles();
  var buildingCheckBoxList =[];
  var floorData = [];

  // console.log("Before for loop, buildingData length is "+JSON.stringify(props.buildingData.length))
  console.log("props buildingData length is "+props.buildingData.length)
  for (var i=0;i<props.buildingData.length;i++)
  {
    // console.log("hello")
    buildingCheckBoxList[i] =  {building: props.buildingData[i].building, checked: true};
    floorData = floorData.concat(props.buildingData[i].floorArray)
    ReceivedBuildingObjects.push(props.buildingData[i])
  }
   
  const [state, setState] = React.useState({
    buildingList :buildingCheckBoxList,
    floorArray: floorData
   });

   console.log("state buildingList length is "+JSON.stringify(state.buildingList.length))
  //  console.log("in building list, props is: "+JSON.stringify(state.buildingList))
  
// useEffect(() => {
//   console.log('in use effect')
//   if (props.buildingArray)
//   {
//     if (props.buildingArray.length != 0)
//     {
//       console.log('in buildilng list ' + JSON.stringify(props.buildingArray[0].building))
//       for(var i=0;i<props.buildingArray.length;i++)
//       {
//           buildingList.push(
//               {
//                   building:props.buildingArray[i].building,
//                   checked:true
//               }
//           )
//       }
//       setState({buildingCheckBoxList: buildingList})
//       console.log('after setting all building ' + JSON.stringify(buildingList))
//     }
//   }
// },[props.buildingArray])

useEffect(() => {
  var buildingCheckBoxList =[];
  var floorData = [];
  for (var i=0;i<props.buildingData.length;i++)
  {
    // console.log("hello")
    buildingCheckBoxList[i] =  {building: props.buildingData[i].building, checked: true};
    floorData = floorData.concat(props.buildingData[i].floorArray)
    ReceivedBuildingObjects.push(props.buildingData[i])
  }
  console.log('')
  setState({...state, buildingList :buildingCheckBoxList, floorArray: floorData})
}, [props.buildingData])




const handleChange = name => event => {
  // console.log(event.target.checked)
  state.buildingList[name].checked = event.target.checked
  

  var checkedBuildingFloorArray=[];
  for(var i=0;i<state.buildingList.length;i++)
  {
    if (state.buildingList[i].checked == true)
    {
      checkedBuildingFloorArray = checkedBuildingFloorArray.concat(ReceivedBuildingObjects[i].floorArray);
    }
  }
  setState({buildingList: state.buildingList, floorArray: checkedBuildingFloorArray})
  // console.log("after handling chagne, state is: " + JSON.stringify(state))
};


  var temp=[];
  var currentCampus=""
  for(var i=0;i<state.buildingList.length;i++)
  {
      console.log("Building name is "+JSON.stringify(state.buildingList[i].building))
     if(props.buildingData[i])
     {
      if(props.buildingData[i].campus == currentCampus)
      {
        temp.push(
          <FormControlLabel
          control={<Checkbox checked={state.buildingList[i].checked} onChange={handleChange(i)}  />}
          label={state.buildingList[i].building}
        />
        )
      }
      else
      {
        currentCampus=props.buildingData[i].campus
        temp.push(
          <div>
              <FormHelperText>{currentCampus}</FormHelperText>
          <FormControlLabel
          control={<Checkbox checked={state.buildingList[i].checked} onChange={handleChange(i)}  />}
          label={state.buildingList[i].building}
        />
        </div>
        )
       
      }
    }

      // temp.push(
      //   <FormControlLabel
      //   control={<Checkbox checked={state.buildingList[i].checked} onChange={handleChange(i)}  />}
      //   label={state.buildingList[i].building}
      // />
      // )
  }
 const onSubmit= event =>{
      console.log("Button clicked")
      console.log("buildinglist and its state" + JSON.stringify(state.floorArray))
  }
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
      <div>
          
        <div className={classes.root} style={{display: "inline-block",overflow: "auto",height:"250px"}}>
        <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Building List</FormLabel>
            <FormGroup>
            {temp}
            
            </FormGroup>
            
        </FormControl>
        
        </div>
        <div style={{display: "inline-block"}}>
            <FloorList floorData={state.floorArray} label={props.label}></FloorList>
        </div>
        {/* <div>
            <Button onClick={onSubmit}>Submit</Button>
        </div> */}

    </div>
  );
}