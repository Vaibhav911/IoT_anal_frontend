import React, { useEffect } from "react";
import Chart from "react-apexcharts";
// import StatType from './StatType';
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



//  function generateData(count, yrange) {
//     var i = 0;
//     var series = [];
//     while (i < count) {
//       var x = 'w' + (i + 1).toString();
//       var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//        series.push({
//         x: x,
//         y: y
//       });
//       i++;
//     }
//     return series;
  // }

   export default function HeatMap(props){
    seriesData =[];

console.log("the props in heatmap are" + JSON.stringify(props.graphData))
    const [values, setValues] = React.useState({
      statType: 'mean',
      attType : '0'
    });

    const classes = useStyles();

    function handleChange(event) {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
      console.log("The frequency is " + event.target.name)
      console.log("The frequency is " + event.target.value)
      // window.clientQuery.frequency = event.target.value
  
    }
  
    function handleChanger(event) {
      setValues(oldValues => ({
        ...oldValues,
        [event.target.name]: event.target.value,
      }));
      console.log("The frequency is " + event.target.name)
      console.log("The frequency is " + event.target.value)
      // window.clientQuery.frequency = event.target.value
  
    }



    function generateData(sensor) {
      var i = 0;
      var series = [];
      while (i < props.graphData.heat_map_data.data[0][sensor].mean.length) {
        var x = props.graphData.bar_data[0].labels[i];
        var y = props.graphData.heat_map_data.data[parseInt(values.attType)][sensor][values.statType][i];
        
        
         series.push({
          x: x,
          y: y
        });
        i++;
      }
        console.log("the series for tttttttt" + sensor+ "is" + JSON.stringify(series));
        return series;
      } 



    for(var k=0;k<props.graphData.heat_map_data.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
          data: generateData(k)
        
      }
    )
  }




  const [state, setState] = React.useState({
   

    options: {
        enableShades:true,
        
        dataLabels: {
          enabled: true
        },
        colors: ["#008FFB"],

         title: {
          text: 'HeatMap Chart (Single color)'
        }
      },
      series: [
       
        {
          name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[0],
          data: generateData(0)
        },
        {
          name:  'Sensor '+ props.graphData.heat_map_data.sensorIds[1],
          data: generateData(1)
        },
        
      ],
    })



    useEffect(()=>{
seriesData=[];
      for(var k=0;k<props.graphData.heat_map_data.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
          data: generateData(k)
        
      }
    )
  }
      setState({
        options: {
          enableShades:true,
          
          dataLabels: {
            enabled: true
          },
          colors: ["#008FFB"],
  
           title: {
            text: 'HeatMap Chart (Single color)'
          }
        },
        series: seriesData,
        




      })




    },[values.attType])


    useEffect(()=>{

      seriesData=[];
      for(var k=0;k<props.graphData.heat_map_data.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
          data: generateData(k)
        
      }
    )
  }
      setState({
        options: {
          enableShades:true,
          shadeIntensity: 0.01,
          
          dataLabels: {
            enabled: true
          },
          colors: ["#008FFB"],
  
           title: {
            text: 'HeatMap Chart (Single color)'
          }
        },
        series: seriesData,
        




      })




    },[values.statType])

   
   
   
    return (


      

        <div id="chart">
            


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
        <InputLabel htmlFor="attType-helper">Attribute</InputLabel>
        <Select
          value={values.attType}
          onChange={handleChanger}
          input={<Input name="attType" id="attType-helper" />}
        >
          {/* <MenuItem value="">
            <em>Mean</em>
          </MenuItem> */}
           <MenuItem value='0'>{props.graphData.attributes[0].charAt(0).toUpperCase() + props.graphData.attributes[0].slice(1)}</MenuItem>
                  <MenuItem value='1'>{props.graphData.attributes[1].charAt(0).toUpperCase() + props.graphData.attributes[1].slice(1)}</MenuItem>
                  <MenuItem value='2'>{props.graphData.attributes[2].charAt(0).toUpperCase() + props.graphData.attributes[2].slice(1)}</MenuItem>
                  
          
          
        </Select>
        <FormHelperText>Select any Attribute</FormHelperText>
      </FormControl>
      

         </form>
         <Chart options={state.options} series={state.series} type="heatmap" height="350" />
       </div>



      );
   };
      
    

    
    
  

   