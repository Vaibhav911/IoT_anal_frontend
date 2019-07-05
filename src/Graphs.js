import React, { useEffect } from 'react';
import GroupedBar from './GroupedBar'
import HeatMap from './HeatMap'
import LineChart from './LineChart'
import Histogram from './Histogram'
import PieChart from './PieChart'
import ScatterChart from './ScatterChart'
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SwitchLabel from './SwitchLabel'
import HideAppBar from './HideAppBar';
import AreaChart from './AreaChart';



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

export default function Graphs(props){
    console.log("rrrrrrr"+JSON.stringify(props.labels.sensorList_Array[0].label))
    const classes = useStyles();


    const [state, setState] = React.useState({
        CampusData: [],
        dataReceived: {},
        count : 0,
        graphData:{}
      })
console.log("Props in graphs is" + JSON.stringify(props))


// useEffect(()=>{
//     axios({
//         method: 'post',
//         url: 'http://localhost:4000/getdata',
//         data: window.clientQuery
//       })
//       .catch(function (error) {
//         console.log(error);
//       })
//       .then(function (response) {
//         console.log("The value from backend is ")
//         console.log(JSON.stringify(response.data));
//         // window.graphData= response.data
//         setState({...state,graphData: response.data})
//       });
      

// })
var pieChartHistogramArray=[];
for (var i=0;i< props.graphData.histogram_data.length;i++)
{
  pieChartHistogramArray.push
  (
    <div style={{borderWidth:'medium'}}>
      <PieChart graphData ={props.graphData.histogram_data[i]}/>
      <Histogram graphData ={props.graphData.histogram_data[i]} />
    </div>
  )
}


return(
    <div>

    {/* <AppBar position="static">
    <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Data Analytics 
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
      {/* <SwitchLabel/> */}
<HideAppBar/>
    <GroupedBar graphData= {props.graphData} comparisonLabels ={props.labels}></GroupedBar>
    <LineChart graphData= {props.graphData} comparisonLabels ={props.labels}></LineChart>
        <HeatMap graphData = {props.graphData} />
        {pieChartHistogramArray}
    
        {/* <PieChart graphData ={props.graphData}/> */}
        {/* <AreaChart graphData ={props.graphData} />
        <Histogram graphData ={props.graphData} />
   
         <ScatterChart graphData={props.graphData}></ScatterChart> */}
        </div>

)



}