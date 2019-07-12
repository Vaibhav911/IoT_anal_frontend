import React, { useEffect } from 'react';
import GroupedBar from './GroupedBar'
import HeatMap from './HeatMap'
import HeatMaps from './Heatmaps'

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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SwitchLabel from './SwitchLabel'
import HideAppBar from './HideAppBar';
import AreaChart from './AreaChart';
import PropTypes from 'prop-types';

// import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import BarGraph from './BarGraph'
import LineGraph from './LineGraph';
import StackedBar from './StackedBar';


function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  window: PropTypes.func,
};


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
    
    
    const [labelState, setlabelState] = React.useState({
      barGraph: true,
      lineGraph: false,

      pieChartHistogramHeatMap : false

    });
  
    const handleChange = name => event => {
      setlabelState({ ...labelState, [name]: event.target.checked });
    };

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
var pieChartHistogramHeatMapArray=[];

  for (var i=0;i< props.graphData.length;i++)
{
  pieChartHistogramHeatMapArray.push
  (
    <div style={{borderWidth:'medium', display: 'inline'}}>
      <HeatMap graphData ={props.graphData[i]} />
      <PieChart graphData ={props.graphData[i]}/>
      <Histogram graphData ={props.graphData[i]} 
      />
    </div>
  )

}

console.log(JSON.stringify(props.graphData[0])+"line 148")


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
      <React.Fragment>
      <CssBaseline />
      <HideOnScroll >
        <AppBar>
          <Toolbar>
            {/* <Typography variant="h6">Scroll to Hide App Bar</Typography> */}
            <FormGroup row>
      {/* <FormControlLabel
        control={
          <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
        }
        label="Secondary"
      /> */}
      <FormControlLabel
        control={
          <Switch
            checked={labelState.barGraph}
            onChange={handleChange('barGraph')}
            value="barGraph"
            color="secondary"
          />
        }
        label="Bar Graph"
      />
       <FormControlLabel
        control={
          <Switch
            checked={labelState.lineGraph}
            onChange={handleChange('lineGraph')}
            value="lineGraph"
            color="secondary"
          />
        }
        label="Line Graph"
      />

       <FormControlLabel
        control={
          <Switch
            checked={labelState.pieChartHistogramHeatMap}
            onChange={handleChange('pieChartHistogramHeatMap')}
            value="pieChartHistogramHeatMap"
            color="secondary"
          />
        }
        label="Pie Chart, Histogram and HeatMap"
      />
      {/* <FormControlLabel control={<Switch value="checkedC" />} label="Uncontrolled" /> */}
      {/* <FormControlLabel disabled control={<Switch value="checkedD" />} label="Disabled" />
      <FormControlLabel disabled control={<Switch checked value="checkedE" />} label="Disabled" /> */}
    </FormGroup>


          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
     
      </Container>
    </React.Fragment>

        {labelState.barGraph ? (props.graphData[0].data_type == "quantitative" ? <BarGraph barGraphData= {props.graphData} comparisonLabels ={props.labels}></BarGraph> : <StackedBar barGraphData= {props.graphData }  comparisonLabels ={props.labels} /> ) : <div/>}
        {labelState.lineGraph ? <LineGraph lineGraphData= {props.graphData} comparisonLabels ={props.labels}></LineGraph> : <div></div>}
        {/* <LineGraph lineGraphData= {props.graphData} comparisonLabels ={props.labels}></LineGraph> */}
        {/* {labelState.heatMap ? <HeatMap graphData = {props.graphData} /> :<div></div> } */}
        {labelState.pieChartHistogramHeatMap ? pieChartHistogramHeatMapArray : <div/>}
        {/* {pieChartHistogramHeatMapArray} */}
    
        {/* <PieChart graphData ={props.graphData}/> */}
        {/* <AreaChart graphData ={props.graphData} />
        <Histogram graphData ={props.graphData} />
   
         <ScatterChart graphData={props.graphData}></ScatterChart> */}
        </div>

)



}