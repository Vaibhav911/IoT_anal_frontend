import React, { Component } from "react";
import Chart from "react-apexcharts";


 export default function PieChart(props) {

  console.log("the props in piechart" + JSON.stringify(props.graphData))
    
  const [state, setState] = React.useState({
    
    options: {
        labels: props.graphData.labels[0],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series:props.graphData.counts[0],


   });
      

      return (



         <div id="chart">
          <Chart options={state.options} series={state.series} type="pie" width="600" />
        </div>



       );
    
  }