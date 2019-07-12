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

 export default function LineGraph(props) {

   seriesData =[];
   if (props.lineGraphData[0].data_type == 'quantitative')
   {
    for(var k=0;k< props.lineGraphData.length;k++)
    {
        seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.lineGraphData[k].bar_data[0].values[0].mean
        })



    }
}
  else
  {
      for(var k=0;k< props.lineGraphData.length;k++)
      {
          seriesData.push({
          name:props.comparisonLabels.sensorList_Array[k].label,
          data: props.lineGraphData[k].bar_data[0].expected_values
          })
      }
  }
  

   console.log("BarGraph props are 55"+JSON.stringify(seriesData))

   const [state, setState] = React.useState({
    options: {
        chart: {
          shadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Average High & Low Temperature',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {

           size: 6
        },
        xaxis: {
          categories: props.lineGraphData[0].data_type=="quantitative" ? props.lineGraphData[0].bar_data[0].labels : props.lineGraphData[0].labels,
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
         
          
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      series: seriesData,


   });


 var selectStatType = {}
 var dataType = props.lineGraphData[0].data_type
 if (dataType == 'quantitative')
 {
    for (var i=0;i<props.lineGraphData.length;i++)
    {
        
        var statType = 'statType' + JSON.stringify(i)
        var attribute = 'attribute' + JSON.stringify(i)
        selectStatType[statType] = 'mean'
        selectStatType[attribute] = props.lineGraphData[i].attributes[0]
    }
}
else
{
    for (var i=0;i<props.lineGraphData.length;i++)
    {
        
        var statType = 'statType' + JSON.stringify(i)
        var attribute = 'attribute' + JSON.stringify(i)
        selectStatType[statType] = 'expected_values'
        selectStatType[attribute] = props.lineGraphData[i].attributes[0]
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
    for (var i=0;i<props.lineGraphData.length;i++)
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
      <MenuItem value={props.lineGraphData[0].attributes[0]}>{props.lineGraphData[0].attributes[0].charAt(0).toUpperCase() + props.lineGraphData[0].attributes[0].slice(1)}</MenuItem>
      <MenuItem value={props.lineGraphData[0].attributes[1]}>{props.lineGraphData[0].attributes[1].charAt(0).toUpperCase() + props.lineGraphData[0].attributes[1].slice(1)}</MenuItem>
      <MenuItem value={props.lineGraphData[0].attributes[2]}>{props.lineGraphData[0].attributes[2].charAt(0).toUpperCase() + props.lineGraphData[0].attributes[2].slice(1)}</MenuItem>
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
    
  for (var i=0;i<props.lineGraphData.length;i++)
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
       
        <MenuItem value='expected_values'>Expectedvalue</MenuItem>
       

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
    <MenuItem value={props.lineGraphData[0].attributes[0]}>{props.lineGraphData[0].attributes[0].charAt(0).toUpperCase() + props.lineGraphData[0].attributes[0].slice(1)}</MenuItem>
    <MenuItem value={props.lineGraphData[0].attributes[1]}>{props.lineGraphData[0].attributes[1].charAt(0).toUpperCase() + props.lineGraphData[0].attributes[1].slice(1)}</MenuItem>
    </Select>
    <FormHelperText>Select any Attribute</FormHelperText>
    </FormControl>
    </form>
    </div>
    )
  }



 }


  





  useEffect(()=>{
    seriesData=[];
    console.log("The state in line 197 is"+ JSON.stringify(statState))
   
    if (props.lineGraphData[0].data_type == 'quantitative')
   {
    for(var k=0;k< props.lineGraphData.length;k++)
    {
        var statType = statState['statType' + JSON.stringify(k)]
        var attribute = statState['attribute' + JSON.stringify(k)]
        console.log('line 202' + ' ' + statType + ' ' + attribute)
        var attributeIndex = 0
        for (var i=0;i<props.lineGraphData[k].attributes.length ;i++)
        {
            if(attribute.toLowerCase() == props.lineGraphData[k].attributes[i])
            {
                attributeIndex=i
                break;
            }
        }
      seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.lineGraphData[k].bar_data[0].values[attributeIndex][statType]
      })
    }
}
else
{
    for(var k=0;k< props.lineGraphData.length;k++)
    {
        var statType = statState['statType' + JSON.stringify(k)]
        var attribute = statState['attribute' + JSON.stringify(k)]
        console.log('line 202' + ' ' + statType + ' ' + attribute)
        var attributeIndex = 0
        for (var i=0;i<props.lineGraphData[k].attributes.length ;i++)
        {
            if(attribute == props.lineGraphData[k].attributes[i])
            {
                attributeIndex=i
                break;
            }
        }
        console.log('attribute index 317 is' + attributeIndex)
      seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.lineGraphData[k].bar_data[attributeIndex].expected_values
      })
    }
}

   
    
  console.log("nnnn" + JSON.stringify(seriesData))
  

    setState({
        options: {
            chart: {
              shadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Average High & Low Temperature',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
    
               size: 6
            },
            xaxis: {
              categories: props.lineGraphData[0].data_type=="quantitative" ? props.lineGraphData[0].bar_data[0].labels : props.lineGraphData[0].labels,
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Temperature'
              },
             
              
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
          series: seriesData,


    })



   },[statState])
    
     return (



         <div id="chart">
             {statTypeComponent}
            
{props.lineGraphData[0].data_type == 'qualitative' ? <div>{JSON.stringify(props.lineGraphData[0].bar_data[0].enumeration)}</div> : <div></div>}

             <Chart options={state.options} series={state.series} type="line" height="500" />
        </div>



     );
  
}
