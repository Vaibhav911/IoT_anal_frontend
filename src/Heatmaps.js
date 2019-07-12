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
      statType: 'expected_values',
      attType : 'humanOccupancy'
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
  
    



    function generateData(sensor) {
      var i = 0;
      var series = [];
      while (i < props.graphData.labels.length) {
        var x = props.graphData.labels[i];
        var y = props.graphData.heat_map_data[sensor][i];
        
        
         series.push({
          x: x,
          y: y
        });
        i++;
      }
        console.log("the series for tttttttt" + sensor+ "is" + JSON.stringify(series));
        return series;
      } 



    for(var k=0;k<props.graphData.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.sensorIds[k],
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
       
       seriesData
        
      ],
    })



    useEffect(()=>{
seriesData=[];
      for(var k=0;k<props.graphData.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.sensorIds[k],
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
      for(var k=0;k<props.graphData.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.sensorIds[k],
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
            


            <div>
    <form className={classes.root} autoComplete="off">
    <FormControl className={classes.formControl}>
      
    <InputLabel htmlFor="statType-helper">StatType</InputLabel>
        <Select
          value={values.statType}
          onChange={handleChange}
          input={<Input name="statType" id="statType-helper" />}
       >
        <MenuItem value='expected_values'>Expectedvalue</MenuItem>
       

      </Select>
      <FormHelperText>Select any Stat type</FormHelperText>
    </FormControl>
    </form>


    <form className={classes.root} autoComplete="off">
    <FormControl className={classes.formControl}>
    <InputLabel htmlFor="attType-helper">Attribute</InputLabel>
        <Select
          value={values.attType}
          onChange={handleChange}
          input={<Input name="attType" id="attType-helper" />}
        >
    <MenuItem value={props.graphData.attributes[0]}>{props.graphData.attributes[0]}</MenuItem>
    <MenuItem value={props.graphData.attributes[1]}>{props.graphData.attributes[1]}</MenuItem>
    </Select>
    <FormHelperText>Select any Attribute</FormHelperText>
    </FormControl>
    </form>
    </div>
         <Chart options={state.options} series={state.series} type="heatmap" height="350" />
       </div>



      );
   };
      
    

    
    
  

   