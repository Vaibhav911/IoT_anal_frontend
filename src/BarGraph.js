import React, {useEffect } from "react";
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
var statMenuItem =[];
  var attMenuItem =[];

 export default function BarGraph(props) {

   seriesData =[];
   if (props.barGraphData[0].data_type == 'quantitative')
   {
    for(var k=0;k< props.barGraphData.length;k++)
    {
        seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.barGraphData[k].bar_data[0].values[0].mean
        })



    }
}
else
{
    for(var k=0;k< props.barGraphData.length;k++)
    {
        seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.barGraphData[k].bar_data[0].percentage
        })
    }
}
  

//    console.log("BarGraph props are "+JSON.stringify(props.graphData[0].bar_data[0]))

   const [state, setState] = React.useState({
    
    options: {
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },

         xaxis: {
          categories: props.barGraphData[0].bar_data[0].labels,
        }
      },
      series: seriesData,


   });


 var selectStatType = {}
 var dataType = props.barGraphData[0].data_type
 if (dataType == 'quantitative')
 {
    for (var i=0;i<props.barGraphData.length;i++)
    {
        
        var statType = 'statType' + JSON.stringify(i)
        var attribute = 'attribute' + JSON.stringify(i)
        selectStatType[statType] = 'mean'
        selectStatType[attribute] = props.barGraphData[i].attributes[0]
    }
}
else
{
    for (var i=0;i<props.barGraphData.length;i++)
    {
        
        var statType = 'statType' + JSON.stringify(i)
        var attribute = 'attribute' + JSON.stringify(i)
        selectStatType[statType] = 'percentage'
        selectStatType[attribute] = props.barGraphData[i].attributes[0]
    }
}

   
   const [statState, setStatState] = React.useState(selectStatType);

  const classes = useStyles();


  function handleChange(event) {
    setStatState(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)
    // window.clientQuery.frequency = event.target.value

  }

  console.log('state line 77 ' + JSON.stringify(statState))

  
  var statTypeComponent = []
  



  if (dataType == 'quantitative')
  {
    for (var i=0;i<props.barGraphData.length;i++)
    {
      statTypeComponent.push(
      <div>
      <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="statType-helper">StatType</InputLabel>
        <Select
          value={statState["statType"+JSON.stringify(i)]}
          onChange={handleChange}
          input={<Input name={"statType"+JSON.stringify(i)} id={"statType-helper" + JSON.stringify(i)}/>}
        >
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
      <InputLabel htmlFor="attribute[i]-helper">{props.comparisonLabels.sensorList_Array[0].label}</InputLabel>
      <Select
      value={statState['attribute'+JSON.stringify(i)]}
      onChange={handleChange}
      input={<Input name={'attribute'+JSON.stringify(i)} id={"attribute-helper" + JSON.stringify(i)} />}
      >
      <MenuItem value={props.barGraphData[0].attributes[0]}>{props.barGraphData[0].attributes[0].charAt(0).toUpperCase() + props.barGraphData[0].attributes[0].slice(1)}</MenuItem>
      <MenuItem value={props.barGraphData[0].attributes[1]}>{props.barGraphData[0].attributes[1].charAt(0).toUpperCase() + props.barGraphData[0].attributes[1].slice(1)}</MenuItem>
      <MenuItem value={props.barGraphData[0].attributes[2]}>{props.barGraphData[0].attributes[2].charAt(0).toUpperCase() + props.barGraphData[0].attributes[2].slice(1)}</MenuItem>
      </Select>
      <FormHelperText>Select any Attribute</FormHelperText>
      </FormControl>
      </form>
      </div>
      )
    }
 }
 else
 {
    
  for (var i=0;i<props.barGraphData.length;i++)
  {
    statTypeComponent.push(
    <div>
    <form className={classes.root} autoComplete="off">
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="statType-helper">StatType</InputLabel>
      <Select
        value={statState["statType"+JSON.stringify(i)]}
        onChange={handleChange}
        input={<Input name={"statType"+JSON.stringify(i)} id={"statType-helper" + JSON.stringify(i)}/>}
      >
        <MenuItem value='percentage'>Percentage</MenuItem>
        <MenuItem value='nonpercentage'>Non Percentage</MenuItem>
        <MenuItem value='expectedval'>expectedval</MenuItem>
       

      </Select>
      <FormHelperText>Select any Stat type</FormHelperText>
    </FormControl>
    </form>


    <form className={classes.root} autoComplete="off">
    <FormControl className={classes.formControl}>
    <InputLabel htmlFor="attribute[i]-helper">{props.comparisonLabels.sensorList_Array[0].label}</InputLabel>
    <Select
    value={statState['attribute'+JSON.stringify(i)]}
    onChange={handleChange}
    input={<Input name={'attribute'+JSON.stringify(i)} id={"attribute-helper" + JSON.stringify(i)} />}
    >
    <MenuItem value={props.barGraphData[0].attributes[0]}>{props.barGraphData[0].attributes[0].charAt(0).toUpperCase() + props.barGraphData[0].attributes[0].slice(1)}</MenuItem>
    <MenuItem value={props.barGraphData[0].attributes[1]}>{props.barGraphData[0].attributes[1].charAt(0).toUpperCase() + props.barGraphData[0].attributes[1].slice(1)}</MenuItem>
    </Select>
    <FormHelperText>Select any Attribute</FormHelperText>
    </FormControl>
    </form>
    <Chart options={state.options} series={state.series} type="bar" height="350" />
    </div>
    )
  }



 }


  





  useEffect(()=>{
    seriesData=[];
    console.log("The state in line 197 is"+ JSON.stringify(statState))
    for(var k=0;k< props.barGraphData.length;k++)
    {
        var statType = statState['statType' + JSON.stringify(k)]
        var attribute = statState['attribute' + JSON.stringify(k)]
        console.log('line 202' + ' ' + statType + ' ' + attribute)
        var attributeIndex = 0
        for (var i=0;i<props.barGraphData[k].attributes.length ;i++)
        {
            if(attribute.toLowerCase() == props.barGraphData[k].attributes[i])
            {
                attributeIndex=i
                break;
            }
        }
      seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.barGraphData[k].bar_data[0].values[attributeIndex][statType]
      })
    }
    
  
  

    setState({
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },

         xaxis: {
          categories: props.barGraphData[0].bar_data[0].labels,
        }
      },
      series: seriesData,


    })



   },[statState])
    
     return (



         <div id="chart">
             {statTypeComponent}
            


             <Chart options={state.options} series={state.series} type="bar" height="350" />

        </div>



     );
  
}
