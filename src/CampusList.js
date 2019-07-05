import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
// import { Button } from '@material-ui/core';
// import SensorList from './SensorList';
// import ZoneList from './ZoneList'
// import FloorList from './FloorList'
import BuildingList from './BuildingList'
// import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));
var ReceivedCampusObjects = [];

export default function CampusList(props) {
  const classes = useStyles();
  


  var campusCheckBoxList =[];
  var buildingData=[];
  
  console.log("porps in campuslist " + JSON.stringify(props))
  
  for(var i=0;i<props.campusData.campusList.length;i++)//initialse cmapus checkbox list
  {
    campusCheckBoxList[i] = {campus: props.campusData.campusList[i].campus, checked: true};
    buildingData = buildingData.concat(props.campusData.campusList[i].buildingArray)
    ReceivedCampusObjects.push(props.campusData.campusList[i])
  }

   const [state, setState] = React.useState({
   campusList :campusCheckBoxList,
   buildingArray: buildingData

  });
  

  
  // useEffect(() =>
  // {
  //     console.log("We are inside useEffect")
      
  //     axios.get("http://localhost:7000/getcampusdata").then(res=> {
  //         console.log("the campus data:" + JSON.stringify(res.data.campusList))
  //         for(var i=0;i<res.data.campusList.length;i++)
  //         {
  //           campusCheckBoxList[i] = {campus: res.data.campusList[i].campus, checked: true};
  //           ReceivedCampusObjects.push(res.data.campusList[i])
  //         }
  //         setState({campusList: campusCheckBoxList, dataReceived : true})
  //         console.log('in use effect function, received object list ' + JSON.stringify(ReceivedCampusObjects))
  //         // console.log("iN afteruseEffect: the state" + JSON.stringify(temp))
  //     })
  //     console.log("data received lol" )
      
  // },[])

  const handleChange = name => event => {
      console.log(event.target.checked)
      state.campusList[name].checked = event.target.checked
      // setState({campusList: state.campusList, buildingArray: checkedCampusBuildingArray,dataReceived : true})

      var checkedCampusBuildingArray=[];
      for(var i=0;i<state.campusList.length;i++)
      {
        if (state.campusList[i].checked == true)
        {
          // console.log("Adding buildings of "+state.campusList[i].campus)
          checkedCampusBuildingArray = checkedCampusBuildingArray.concat(ReceivedCampusObjects[i].buildingArray);
        }
      }
      // console.log("The buildings added are "+JSON.stringify(checkedCampusBuildingArray))
      
      setState({campusList: state.campusList, buildingArray: checkedCampusBuildingArray})
      // console.log("after handling chagne, state.buildingarra is: " + JSON.stringify(state.buildingArray.length))
  };

  const { campusList } = state;

  var campusFormList=[];
  
  for(var i=0;i<campusList.length;i++)
  {   
      campusFormList.push(
        <FormControlLabel
        control={<Checkbox checked={state.campusList[i].checked} onChange={handleChange(i)}  />}
        label={state.campusList[i].campus}
      />
      )
  }

 const onSubmit= event =>{
      
  }
//   const error = [gilad, jason, antoine].filter(v => v).length !== 2;




console.log("Before return state is "+JSON.stringify(state.buildingArray.length))
return (
       <div> 
    <div className={classes.root} style={{display: "inline-block",overflow: "auto",height:"250px"}}>
      <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" >Campus List</FormLabel>
            <FormGroup>
              {campusFormList}
            </FormGroup>
            <FormHelperText>Choose your Campus</FormHelperText>
      </FormControl>
    </div>
    
    <div style={{display: "inline-block"}}>
      <BuildingList buildingData={state.buildingArray} label={props.label}></BuildingList>
    </div>

  </div>
);


}


