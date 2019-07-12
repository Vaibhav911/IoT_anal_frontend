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


export default function  StackedBar (props) {


    const classes = useStyles();

    var seriesData= [];
    var selectStatType = {}
    for (var i=0;i<props.barGraphData.length;i++)
    {   
        
        var statType = 'statType' + JSON.stringify(i)
        var attribute = 'attribute' + JSON.stringify(i)
        selectStatType[statType] = 'expected_values'
        selectStatType[attribute] = props.barGraphData[i].attributes[0]
    }
    const [statState, setStatState] = React.useState(selectStatType);
    
    for(var i=0; i<props.barGraphData[0].bar_data.length;i++)
    {
        seriesData.push({
            name: props.barGraphData[0].bar_data[i].percentage
        })
    }
    

 


console.log("the props is 14"  + JSON.stringify(props))
    const[state,setState]   = React.useState({
        options: {
          chart: {
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },

          xaxis: {
            type: 'datetime',
            categories: props.barGraphData[0].labels,
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
        },
        series: [{
          name: 'False',
          data: props.barGraphData[0].bar_data[0].non_percentage.false
        }, {
          name: 'True',
          data: props.barGraphData[0].bar_data[0].non_percentage.true
        }],
      })


      useEffect(()=>{
        seriesData=[];
        console.log("The state in line 197 is"+ JSON.stringify(statState))

     
            var statType = statState['statType' + JSON.stringify(0)]
            var attribute = statState['attribute' + JSON.stringify(0)]
            console.log('line 202' + ' ' + statType + ' ' + attribute)
            var attributeIndex = 0
            for (var i=0;i<props.barGraphData[0].attributes.length ;i++)
            {
                if(attribute == props.barGraphData[0].attributes[i])
                {
                    attributeIndex=i
                    break;
                }
            }
            console.log('attribute index 317 is' + attributeIndex)
          seriesData.push({
            name:props.comparisonLabels.sensorList_Array[0].label,
            data: props.barGraphData[0].bar_data[attributeIndex][statType]
          })
        
    


    setState({


        options: {
            chart: {
              stacked: true,
              toolbar: {
                show: true
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
  
            xaxis: {
              type: 'datetime',
              categories: props.barGraphData[0].labels,
            },
            legend: {
              position: 'right',
              offsetY: 40
            },
            fill: {
              opacity: 1
            }
          },
          series: [{
            name: 'False',
            data: props.barGraphData[0].bar_data[attributeIndex][statType].false
          }, {
            name: 'True',
            data: props.barGraphData[0].bar_data[attributeIndex][statType].true
          }],
    })
})




    
var statTypeComponent=[]

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
       
        <MenuItem value='expected_values'>Expectedvalue</MenuItem>
        <MenuItem value='percentage'>Percentage</MenuItem>
        <MenuItem value='non_percentage'>Non percentage</MenuItem>
        
       

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
    </div>
    )
  }
  function handleChange(event) {
    setStatState(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)
    // window.clientQuery.frequency = event.target.value

  }
  
    
      return (
        

        <div id="chart">
            {statTypeComponent}
          <Chart options={state.options} series={state.series} type="bar" height="350" />
        </div>


      );
    
  }
