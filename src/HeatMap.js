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
   var seriesData =[];

    
   if (props.graphData.data_type == 'quantitative')
   {
    for(var k=0;k< props.graphData.length;k++)
    {
        seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.graphData[k].bar_data[0].values[0].mean
        })



    }
}
  else
  {
      for(var k=0;k< props.graphData.length;k++)
      {
          seriesData.push({
          name:props.comparisonLabels.sensorList_Array[k].label,
          data: props.graphData[k].bar_data[0].expected_values
          })
      }
  }
  

console.log("the props in heatmap are" + JSON.stringify(props.graphData))
    


seriesData =[];
var quantType={}
   if (props.graphData.data_type == 'quantitative')
   {
    quantType.statType='mean'
    quantType.attType='0'
    }

  else
  { 
    quantType.attType='0'
  }
  const [values, setValues] = React.useState(quantType);

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
      // console.log("line 85" + JSON.stringify(props.graphData.heat_map_data.data[0][sensor]))
      // console.log("line 76"+ sensor)
     
      var quantType={}
      if (props.graphData.data_type == 'quantitative')
      {
      
        
      while (i < props.graphData.heat_map_data.data[0][sensor].mean.length) {
        var x = props.graphData.bar_data[0].labels[i];
        var y = props.graphData.heat_map_data.data[parseInt(values.attType)][sensor][values.statType][i];
        
        
         series.push({
          x: x,
          y: y
        });
        i++;
      }
       }
   
     else
     { 
        
      while (i < props.graphData.heat_map_data[0][0].length) {
        var x = props.graphData.labels[i];
        console.log("line 139" + JSON.stringify(props.graphData.heat_map_data[parseInt(values.attType)][sensor]))
        var y = props.graphData.heat_map_data[parseInt(values.attType)][sensor][i];
        
        
         series.push({
          x: x,
          y: y
        });
        i++;
      }

     }
     
     
        
        return series;
      } 



   
      if (props.graphData.data_type == 'quantitative')
      {
        for(var k=0;k<props.graphData.heat_map_data.sensorIds.length;k++)
        {
          seriesData.push(
            {
              name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
                data: generateData(k)
              
            }
          )
        }
      
       }
   
     else
     { 
      for(var k=0;k<props.graphData.sensorIds.length;k++)
      {
        seriesData.push(
          {
            name: 'Sensor '+ props.graphData.sensorIds[k],
              data: generateData(k)
            
          }
        )
      }
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
if (props.graphData.data_type == 'quantitative')
{
  for(var k=0;k<props.graphData.heat_map_data.sensorIds.length;k++)
  {
    seriesData.push(
      {
        name: 'Sensor '+ props.graphData.heat_map_data.sensorIds[k],
          data: generateData(k)
        
      }
    )
  }

 }

else
{ 
for(var k=0;k<props.graphData.sensorIds.length;k++)
{
  seriesData.push(
    {
      name: 'Sensor '+ props.graphData.sensorIds[k],
        data: generateData(k)
      
    }
  )
}
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




    },[values])


   





    var menuItemArray=[];



    if (props.graphData.data_type == 'quantitative')
   {
    menuItemArray.push( 
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
      <InputLabel htmlFor="attType-helper">Attribute</InputLabel>
      <Select
        value={values.attType}
        onChange={handleChange}
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
       </div>
   )
    }

  else
  {
    menuItemArray.push( 
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
    <MenuItem value='0'>{props.graphData.attributes[0].charAt(0).toUpperCase() + props.graphData.attributes[0].slice(1)}</MenuItem>
    <MenuItem value='1'>{props.graphData.attributes[1].charAt(0).toUpperCase() + props.graphData.attributes[1].slice(1)}</MenuItem>
    </Select>
    <FormHelperText>Select any Attribute</FormHelperText>
    </FormControl>
    </form>
    
       </div>
   )
  }
    
   
   
   
    return (


      

        <div id="chart">
            
        {menuItemArray}

         <Chart options={state.options} series={state.series} type="heatmap" height="350" />
       </div>



      );
   };
      
    

    
    
  

   