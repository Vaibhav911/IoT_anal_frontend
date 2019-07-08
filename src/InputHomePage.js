import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import SensorList from './SensorList'
// import ZoneList from './ZoneList'
// import FloorList  from './FloorList'
// import BuildingList from './BuildingList'
// import NewCampusList from './NewCampusList'
// import GetData from './GetData';
import CampusList from './CampusList';
import StartTimePicker from './StartTimePicker'
import EndTimePicker from './EndTimePicker'
import SelectFrequency from './SelectFrequency'
import axios from 'axios';
import { Button } from '@material-ui/core';
// import Material from './Material'
import InputLabelTextField from './InputLabelTextField' 
// import GroupedBar from './GroupedBar'
// import HeatMap from './HeatMap'
// import LineChart from './LineChart'
// import PieChart from './PieChart'
// import ScatterChart from './ScatterChart'
import SelectSensorType from './SelectSensorType'
import Graphs from './Graphs'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
window.graphData ={}
//  window.clientQuery = {sensorList_Array: [{sensorList: [], label:'',sensorType:''}], startTime: '', endTime: '', frequency: ''};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function InputHomePage() {
  const classes = useStyles();

  // var comparisonLabels;
  const [state, setState] = React.useState({
    CampusData: [],
    dataReceived: {},
    count : 0,
    graphData:{},
    plotGraphs: false,
    comparisonLabels: ''
  })

  useEffect(() =>
  {

      
      axios.get("http://localhost:7000/getcampusdata").then(res=> {
        console.log("Data is :" + JSON.stringify(res))

          setState({...state, CampusData : [<div><CampusList campusData = {res.data} label={state.count}></CampusList><InputLabelTextField label={state.count}></InputLabelTextField><SelectSensorType label={state.count}/></div>], dataReceived: res.data, count : 1})

      })
      
      
  },[])

  function handleSubmit()
  {
    if (window.clientQuery.frequency == '')
    {
      alert("you have not selected freq")
    }
    console.log("value of myVar is " + JSON.stringify(window.clientQuery));

    
    
    
    // var link = "http://localhost:4000/getdata?"
    // + "sensorIds=" + window.clientQuery.sensorList_Array.sensorList
    // + "&frequency-=" + window.clientQuery.frequency
    // + "&startTime="+ window.clientQuery.startTime
    // +"&endTime="+ window.clientQuery.endTime
    // +"&sensorType="+  window.clientQuery.sensorList_Array.sensorType
    // +"&label="+ window.clientQuery.sensorList_Array.label

    //console.log(link)

// axios.post(link).then(response=>{
//   // window.clientQuery = {sensorList_Array: [{sensorList: [], label:'',sensorType:''}], startTime: '', endTime: '', frequency: ''};
// })
axios({
  method: 'post',
  url: 'http://localhost:4000/getdata',
  data: window.clientQuery
})
.catch(function (error) {
  console.log(error);
})
.then(function (response) {
  console.log("The value from backend is ")
  console.log(JSON.stringify(response.data));
  // window.graphData= response.data
  setState({...state,graphData: response.data, plotGraphs : true, comparisonLabels :window.clientQuery})
  // setState({...state,})
});


console.log("Rchd at the end of handle submir")

 }


  function handleAddInputBlock()
  {
    console.log("wait for some time");
    window.clientQuery.sensorList_Array.push({sensorList: [], label:''})
    var CampusArray = state.CampusData;
    console.log("button clicked")
    CampusArray.push(<div><hr></hr><CampusList campusData={state.dataReceived} label={state.count}></CampusList><InputLabelTextField label={state.count}></InputLabelTextField><SelectSensorType label={state.count}></SelectSensorType></div>)
    setState({...state, CampusData: CampusArray, count: state.count +1} )
  }
  return (
    <div> 

    {!state.plotGraphs ? 
      <div >
                 <AppBar position="static">
    <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            
          </IconButton>
          <Typography variant="h6" className={classes.title}>{<img src={require('./senZopt-logo.png')} />}
             Data Analytics 
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
        <div>
            {state.CampusData}
          </div>

          <div>
            <Button variant="contained" color="primary" onClick={handleAddInputBlock}>Add to compare</Button>
          </div>

          <hr></hr>

          <div style={{display: "flex"}}>
            <StartTimePicker></StartTimePicker>
          </div>

          <div style={{display: "flex"}}>
            <EndTimePicker></EndTimePicker>
          </div>

          <div style={{display: "flex"}}>
            <SelectFrequency></SelectFrequency>
          </div>
          
          <div>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </div>
      </div>
    :
    <Graphs graphData = {state.graphData} labels={state.comparisonLabels}/>
    }
    </div>
  );
}

export default InputHomePage;
