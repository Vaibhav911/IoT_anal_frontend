import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';



export default function AreaChart(props){
      
    
        const[state, setState] = React.useState({
          options: {
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },


            xaxis: {
              type: 'Counts',
              categories: props.graphData.histogram_data.labels[0],
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            }
          },
          series: [{
            name: 'series1',
            data: props.graphData.histogram_data.counts[0]
          }],
        });
      

      
        return (
          

          <div id="Achart">
            <ReactApexChart options={state.options} series={state.series} type="area" height="350" />
          </div>
  

        )
      
    }