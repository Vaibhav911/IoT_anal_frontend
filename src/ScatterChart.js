import React, { Component, useEffect } from "react";
import Chart from "react-apexcharts";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));



var seriesData =[];

export default function ScatterChart(props) {
      
  seriesData=[];
  const classes = useStyles();



  const [values, setValues] = React.useState({
    statType: 'mean',
    attType1 : '0',
    attType2: '1'
  });



  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)
    // window.clientQuery.frequency = event.target.value

  }

  function handleChanger1(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)}
    // window.clientQuery.frequency = event.target.value

    function handleChanger2(event) {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
      console.log("The frequency is " + event.target.name)
      console.log("The frequency is " + event.target.value)}
      // window.clientQuery.frequency = event.target.value
console.log("The pppppp"+JSON.stringify(props))

  for(var k=0; k<props.graphData.heat_map_data.sensorIds.length;k++)
  {   var datum = [];
      

    for(var l=0; l<props.graphData.heat_map_data.data[0][k].mean.length;l++)

   { var data1=[]
    data1 = [props.graphData.heat_map_data.data[parseInt(values.attType1)][k][values.statType][l], props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]];
    // data1.push(props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]);
    datum.push(data1)
    console.log("vvvvvv"+datum);
   }
    seriesData.push({
      name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
      data: datum
    })
  
  }

    const[state,setState] = {
      options: {
        chart: {
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
        xaxis: {
            tickAmount: 10,
            labels: {
                formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                }
            }
        },
        yaxis: {
          tickAmount: 7
        }
      },
      series: seriesData,
    }
  
useEffect(()=>{
seriesData=[];

  for(var k=0; k<props.graphData.heat_map_data.sensorIds.length;k++)
  {   var datum = [];
      


    for(var l=0; l<props.graphData.heat_map_data.data[0][k].mean.length;l++)

  { var data1=[]
    data1 = [props.graphData.heat_map_data.data[parseInt(values.attType1)][k][values.statType][l], props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]];
    // data1.push(props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]);
    datum.push(data1)
  }
    seriesData.push({
      name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
      data: datum
    })
  
  }

  setState({

    options: {
      chart: {
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      xaxis: {
          tickAmount: 10,
          labels: {
              formatter: function(val) {
                  return parseFloat(val).toFixed(1)
              }
          }
      },
      yaxis: {
        tickAmount: 7
      }
    },
    series: seriesData,

  })


},[values.attType1])



useEffect(()=>{
  seriesData=[];
  
    for(var k=0; k<props.graphData.heat_map_data.sensorIds.length;k++)
    {   var datum = [];
        

  
      for(var l=0; l<props.graphData.heat_map_data.data[0][k].mean.length;l++)

     { var data1=[]
      data1.push(props.graphData.heat_map_data.data[parseInt(values.attType1)][k][values.statType][l]);
      data1.push(props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]);
      datum.push(data1)
     }
      seriesData.push({
        name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
        data: datum
      })
    }
  
    setState({
  
      options: {
        chart: {
          zoom: {
            enabled: true,
            type: 'xy'
          }
        },
        xaxis: {
            tickAmount: 10,
            labels: {
                formatter: function(val) {
                    return parseFloat(val).toFixed(1)
                }
            }
        },
        yaxis: {
          tickAmount: 7
        }
      },
      series: seriesData,
  
    })
  
  
  },[values.attType2]) 
  
  


  useEffect(()=>{
    seriesData=[];
    
      for(var k=0; k<props.graphData.heat_map_data.data[0][k].mean.length;k++)
      {   var datum = [];
          

    
        for(var l=0; l<props.graphData.heat_map_data.data[0][k].mean.length;l++)

       {var data1=[]   
        

        data1 = [props.graphData.heat_map_data.data[parseInt(values.attType1)][k][values.statType][l], props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]];
        // data1.push(props.graphData.heat_map_data.data[parseInt(values.attType2)][k][values.statType][l]);
        datum.push(data1)
       }
        seriesData.push({
          name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
          data: datum
        })
      }
    
      setState({
    
        options: {
          chart: {
            zoom: {
              enabled: true,
              type: 'xy'
            }
          },
          xaxis: {
              tickAmount: 10,
              labels: {
                  formatter: function(val) {
                      return parseFloat(val).toFixed(1)
                  }
              }
          },
          yaxis: {
            tickAmount: 7
          }
        },
        series: seriesData,
    
      })
    
    
    },[values.statType])



    return (
      <div>
      <form className={classes.root} autoComplete="off">
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="statType-helper">StatType</InputLabel>
        <Select
          value={values.statType}
          onChange={handleChange}
          input={<Input name="statType" id="statType-helper" />}
        >
          {/* <MenuItem value="">
            <em>Mean</em>
          </MenuItem> */}
          <MenuItem value='mean'>Mean</MenuItem>
          <MenuItem value='median'>Median</MenuItem>
          <MenuItem value='max'>Maximum</MenuItem>
          <MenuItem value='min'>Minimum</MenuItem>
          <MenuItem value='variance'>Variance</MenuItem> 
          <MenuItem value='stddev'>Stddev</MenuItem>

          
        </Select>
        <FormHelperText>Select any Stat type</FormHelperText>
      </FormControl>
      

         </form>


         <form className={classes.root} autoComplete="off">

      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="attType1-helper">Attribute</InputLabel>
        <Select
          value={values.attType1}
          onChange={handleChanger1}
          input={<Input name="attType1" id="attType1-helper" />}
        >
          {/* <MenuItem value="">
            <em>Mean</em>
          </MenuItem> */}
          <MenuItem value='0'>Att1</MenuItem>
          <MenuItem value='1'>Att2</MenuItem>
          <MenuItem value='2'>Att3</MenuItem>
          
          
        </Select>
        <FormHelperText>Select any Attribute</FormHelperText>
      </FormControl>
      

         </form>


<form className={classes.root} autoComplete="off">

<FormControl className={classes.formControl}>
  <InputLabel htmlFor="attType2-helper">Attribute2</InputLabel>
  <Select
    value={values.attType2}
    onChange={handleChanger2}
    input={<Input name="attType2" id="attType2-helper" />}
  >
    {/* <MenuItem value="">
      <em>Mean</em>
    </MenuItem> */}
    <MenuItem value='0'>Att1</MenuItem>
    <MenuItem value='1'>Att2</MenuItem>
    <MenuItem value='2'>Att3</MenuItem>
    
    
  </Select>
  <FormHelperText>Select any Attribute</FormHelperText>
</FormControl>


   </form>
      <div id="chart">
        <Chart options={state.options} series={state.series} type="scatter" height="350" />
      </div>

      </div>
    );
  
}




// //  function generateDayWiseTimeSeries(baseval, count, yrange) {
// //       var i = 0;
// //       var series = [];
// //       while (i < count) {
// //         var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

// //          series.push([baseval, y]);
// //         baseval += 86400000;
// //         i++;
// //       }
// //       return series;
// //     }

// //     export default function ScatterChart(){
        
// //   const [state, setState] = React.useState({
    
// //     options: {
// //         chart: {
// //           zoom: {
// //             type: 'xy'
// //           }
// //         },
// //         dataLabels: {
// //           enabled: false
// //         },
// //         grid: {
// //           xaxis: {
// //             showLines: true
// //           },
// //           yaxis: {
// //             showLines: true
// //           },
// //         },
// //         xaxis: {
// //           type: 'datetime',
// //         },
// //         yaxis: {
// //           max: 70
// //         }
// //       },
// //       series: [
// //         {
// //           name: 'TEAM 1',
// //           data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
// //             min: 10,
// //             max: 60
// //           })
// //         },
// //         {
// //           name: 'TEAM 2',
// //           data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
// //             min: 10,
// //             max: 60
// //           })
// //         },
// //         {
// //           name: 'TEAM 3',
// //           data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
// //             min: 10,
// //             max: 60
// //           })
// //         },
// //         {
// //           name: 'TEAM 4',
// //           data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {
// //             min: 10,
// //             max: 60
// //           })
// //         },
// //         {
// //           name: 'TEAM 5',
// //           data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 30, {
// //             min: 10,
// //             max: 60
// //           })
// //         },
// //       ],

// //    });

        

   
// //         return (



// //            <div id="chart">
// //                <StatType></StatType>
// //             <Chart options={state.options} series={state.series} type="scatter" height="350" />
// //           </div>



// //          );
      
// //     }