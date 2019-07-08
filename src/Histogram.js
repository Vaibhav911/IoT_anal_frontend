import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

// import Histogram from 'react-chart-histogram';


export default function Histogram (props){


    const[state,setState] = React.useState({
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: props.graphData.labels[0],
        }
      },
      series: [{
        data: props.graphData.counts[0]
      }],
    })
  

  
    return (
      

      <div id="chart">
        <ReactApexChart options={state.options} series={state.series} type="histogram" height="350" width ='40%'/>
      </div>


    );
  
}