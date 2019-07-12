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

var seriesData ={};
 export default function PieChart(props) {
  const classes = useStyles();

  console.log("the props in piechart" + JSON.stringify(props.graphData))
  
  seriesData ={};
  if (props.graphData.data_type == 'quantitative')
   { 
      seriesData.name=props.graphData.histogram_data[0].labels[0]
      seriesData.data =props.graphData.histogram_data[0].counts[0]
    }
  else
  {
    seriesData.name = props.graphData.histogram_data[0].labels
    seriesData.data = props.graphData.histogram_data[0].values
  }
  console.log("line 56" + JSON.stringify(seriesData))
    
  const [state, setState] = React.useState({
    
    options: {
        labels: seriesData.name,  
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
      series: seriesData.data,


   });
   const [values, setValues] = React.useState({

    attType : '0'
  });
  console.log("the state is 82 " + JSON.stringify(state))

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)
    // window.clientQuery.frequency = event.target.value

  }
      
console.log("Line 72" + JSON.stringify(props))
useEffect(()=>{
  seriesData ={};
  console.log("index in line 89"+ parseInt(values.attType))
  if (props.graphData.data_type == 'quantitative')
   { 
      seriesData.name=props.graphData.histogram_data[0].labels[parseInt(values.attType)]
      seriesData.data =props.graphData.histogram_data[0].counts[parseInt(values.attType)]
    }
  else
  {
    seriesData.name = props.graphData.histogram_data[parseInt(values.attType)].labels
    seriesData.data = props.graphData.histogram_data[parseInt(values.attType)].values
  }
  console.log("seriesData obj is 99 " + JSON.stringify(seriesData))
setState({
  options: {
    labels: seriesData.name,
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
  series: seriesData.data,

})



},[values.attType])

var menuItemArray=[];
for(var i=0;i<props.graphData.attributes.length;i++)
{
  menuItemArray.push(<MenuItem value={JSON.stringify(i)}>{props.graphData.attributes[i].charAt(0).toUpperCase() + props.graphData.attributes[i].slice(1)}</MenuItem>)
}
      return (



         <div id="chart">

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
     {/* <MenuItem value='0'>{props.graphData.attributes[0].charAt(0).toUpperCase() + props.graphData.attributes[0].slice(1)}</MenuItem>
            <MenuItem value='1'>{props.graphData.attributes[1].charAt(0).toUpperCase() + props.graphData.attributes[1].slice(1)}</MenuItem>
            <MenuItem value='2'>{props.graphData.attributes[2].charAt(0).toUpperCase() + props.graphData.attributes[2].slice(1)}</MenuItem> */}
            {menuItemArray}
    
    
  </Select>
  <FormHelperText>Select any Attribute</FormHelperText>
</FormControl>


   </form>
          <Chart options={state.options} series={state.series} type="pie" width="600" />
        </div>



       );
    
  }