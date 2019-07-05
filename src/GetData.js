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


export default function GetData(){

var campusList =[{campus: '45', checked: true}];
const [state, setState] = React.useState({
   campusList:[]
   });  
useEffect(() =>
{
    console.log("We are inside useEffect")
    axios.get("http://localhost:5000/campusData").then(res=> {
        console.log("the campus data:" + JSON.stringify(res.data))
        for(var i=0;i<res.data.campusList.length;i++)
          {
              campusList[i] =
                  {
                      campus:res.data.campusList[i],
                      checked:true
                  }
              
          }
          console.log("iN afteruseEffect: " + JSON.stringify(campusList))
          setState({campusList: campusList})
          console.log("iN afteruseEffect: the state" + JSON.stringify(state))

    })
    // return(
    //     <div>{campusList[0].campus}</div>
    // this.setState({attrName: campusList})
    // )
}, [])
if(state.campusList.length==0)
    return(
        <div>No objects</div>
    )
else 
return(
    <div>{state.campusList[0].campus}</div>
)


}