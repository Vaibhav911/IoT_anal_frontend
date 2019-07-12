import React, { useEffect } from "react";
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
    display: 'inline',
    flexDirection: 'row',
    height: '100px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

var seriesData = [];

 export default function  GroupedBar(props) {
console.log("The props in grouped bar is"+ JSON.stringify(props.barGraphData[0].bar_data.length))
  console.log("Props in grouped bar are" + JSON.stringify(props.barGraphData[0].bar_data[0].values[0]))

  
// var stateAttType =[];

// for(var k=0;k<props.barGraphData.bar_data.length;k++)
// {
//   var string ='attType'
//   string = string.concat(k.toString)
//   stateAttType.push({ {string} : '0'})
// }
// console.log(stateAttType)

  const classes = useStyles();
  // var statType = ''
  // var attType = ''
  var statType = []
  var selectStatType = []
  var statTypeComponent = []
  for (var i=0;i<props.barGraphData.length;i++)
  {
    if (props.barGraphData[i].data_type == 'quantitative')
    {
      statType.push({
        stats: 'mean',
        attribute: props.barGraphData[i].attributes[0]
      });

      selectStatType.push({
        stats: "set-" +JSON.stringify(i) + "att-" +JSON.stringify(0),
        attribute: "set-" +JSON.stringify(i) + "att-" +JSON.stringify(0)
      })

      

      for (var i=0;i<statState.statType.length;i++)
      {
        statTypeComponent.push(
        <div className={classes.root}>
          <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="statType-helper">StatType</InputLabel>
              <Select
                value={statState.statType}
                onChange={handleChange}
                input={<Input name={JSON.stringify(i)+"statType"} id="statType-helper" />}
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
            <InputLabel htmlFor="attType[i]-helper">{props.comparisonLabels.sensorList_Array[0].label}</InputLabel>
              <Select
              value={statState.attType}
              onChange={handleChange}
              input={<Input name={JSON.stringify(i)+'attType'} id="attType-helper" />}
              >
                <MenuItem value={"set-" +JSON.stringify(i) + "att-" +JSON.stringify(0)}>{props.barGraphData[0].attributes[0].charAt(0).toUpperCase() + props.barGraphData[0].attributes[0].slice(1)}</MenuItem>
                <MenuItem value={"set-" +JSON.stringify(i) + "att-" +JSON.stringify(1)}>{props.barGraphData[0].attributes[1].charAt(0).toUpperCase() + props.barGraphData[0].attributes[1].slice(1)}</MenuItem>
                <MenuItem value={"set-" +JSON.stringify(i) + "att-" +JSON.stringify(2)}>{props.barGraphData[0].attributes[2].charAt(0).toUpperCase() + props.barGraphData[0].attributes[2].slice(1)}</MenuItem>
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
      statType.push({
        stats: 'non_percentage',
        attribute: props.barGraphData[i].attributes[0]
      });
    }

    // var statTypeComponent = []

    for (var i=0;i<statState.statType.length;i++)
    {
      statTypeComponent.push(
      <div >
      <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="statType-helper">StatType</InputLabel>
        <Select
          value={statState.statType}
          onChange={handleChange}
          input={<Input name={JSON.stringify(i)+"statType"} id="statType-helper" />}
        >
          <MenuItem value='Non-percentage'>Mean</MenuItem>
          <MenuItem value='Percentage'>Median</MenuItem>
          {/* <MenuItem value='max'>Maximum</MenuItem>
          <MenuItem value='min'>Minimum</MenuItem>
          <MenuItem value='variance'>Variance</MenuItem> 
          <MenuItem value='stddev'>Stddev</MenuItem> */}
  
        </Select>
        <FormHelperText>Select any Stat type</FormHelperText>
      </FormControl>
      </form>
  
  
      <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
      <InputLabel htmlFor="attType[i]-helper">{props.comparisonLabels.sensorList_Array[0].label}</InputLabel>
      <Select
      value={statState.attType}
      onChange={handleChange}
      input={<Input name={JSON.stringify(i)+'attType'} id="attType-helper" />}
      >
      <MenuItem value={"set-" +JSON.stringify(i) + "att-" +JSON.stringify(0)}>{props.barGraphData[0].attributes[0].charAt(0).toUpperCase() + props.barGraphData[0].attributes[0].slice(1)}</MenuItem>
      <MenuItem value={"set-" +JSON.stringify(i) + "att-" +JSON.stringify(1)}>{props.barGraphData[0].attributes[1].charAt(0).toUpperCase() + props.barGraphData[0].attributes[1].slice(1)}</MenuItem>
      {/* <MenuItem value={"set-" +JSON.stringify(i) + "att-" +JSON.stringify(2)}>{props.barGraphData[0].attributes[2].charAt(0).toUpperCase() + props.barGraphData[0].attributes[2].slice(1)}</MenuItem> */}
      </Select>
      <FormHelperText>Select any Attribute</FormHelperText>
      </FormControl>
      </form>
      </div>
      )
    }

  }
  

  const [statState, setStatState] = React.useState({
    statType: statType,
    selectStatType: selectStatType
  });

console.log("xxxxxx" + JSON.stringify(statState))
  // console.log(values)
  seriesData=[];
  for(var k=0;k< props.barGraphData.length;k++)
  {
    seriesData.push({
      name:props.comparisonLabels.sensorList_Array[k].label,
      data: props.barGraphData[k].bar_data[0].values[0].mean
    })
  }
  

  console.log("rtrtrtrt"+ JSON.stringify(seriesData))



  const inputLabel = React.useRef(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);

  function handleChange(event) {
    // statState = statState.statType[]
    var statType = statState.statType
    if(event.target.name[1]=='a')
    {
      
      var setIndex = parseInt(event.target.value[4])
      var attrIndex = parseInt(event.target.value[9])
      console.log("103 setIndex andattrib"+ setIndex  + " , " + attrIndex)
      statType[parseInt(event.target.name[0])].attribute =  props.barGraphData[setIndex].attributes[attrIndex]
    }
    setStatState(oldValues => ({
      ...oldValues,
      statType : statType,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)
    console.log(" The evnt in line 104 is" + JSON.stringify(event.target))
    // window.clientQuery.frequency = event.target.value

  }

  // function handleChanger(event) {
  //   setValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value,
  //   }));
  //   console.log("The frequency is " + event.target.name)
  //   console.log("The frequency is " + event.target.value)
  //   // window.clientQuery.frequency = event.target.value

  // }
      // console.log("size of labels is" + JSON.stringify(props.barGraphData.barGraphData.data[0].labels))
      // console.log("size of values is" + JSON.stringify(props.barGraphData.barGraphData.data[0].values[0].mean))
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


   useEffect(()=>{
    seriesData=[];
    for(var k=0;k< props.barGraphData.length;k++)
    {
      seriesData.push({
        name:props.comparisonLabels.sensorList_Array[k].label,
        data: props.barGraphData[k].bar_data[0].values[0].statState.statType[k].stats
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



   },[statState.statType])
  
         





//    useEffect(()=>{
// seriesData=[];
//     for(var k=0;k< props.barGraphData[0].bar_data.length;k++)
//   {
//     seriesData.push({
//       name:props.comparisonLabels.sensorList_Array[k].label,
//       data: props.barGraphData[0].bar_data[k].values[parseInt(values.attType)][values.statType]
//     })
//   }
  
//     setState({
//       options: {
//         plotOptions: {
//           bar: {
//             horizontal: false,
//             dataLabels: {
//               position: 'top',
//             },
//           }
//         },
//         dataLabels: {
//           enabled: true,
//           offsetX: -6,
//           style: {
//             fontSize: '12px',
//             colors: ['#fff']
//           }
//         },
//         stroke: {
//           show: true,
//           width: 1,
//           colors: ['#fff']
//         },

//          xaxis: {
//           categories: props.barGraphData[0].bar_data[0].labels,
//         }
//       },
//       series: 
//         seriesData ,


//     })



//    },[values.attType])
   



  //  var attTypeArray =[]
  //  for(var i =0;i<props.barGraphData.bar_data.length;i++)
  //  { 
  //    attTypeArray.push(
  //     <form className={classes.root} autoComplete="off">
      
  //     <FormControl className={classes.formControl}>
  //       <InputLabel htmlFor="attType[i]-helper">{props.comparisonLabels.sensorList_Array[i].label}</InputLabel>
  //       <Select
  //         value={values.attType[i]}
  //         onChange={handleChange}
  //         input={<Input name='nnnnnn' id="attType-helper" />}
  //       >
  //         {/* <MenuItem value="">
  //           <em>Mean</em>
  //         </MenuItem> */}
  //         <MenuItem value='0'>{props.barGraphData.attributes[0].charAt(0).toUpperCase() + props.barGraphData.attributes[0].slice(1)}</MenuItem>
  //         <MenuItem value='1'>{props.barGraphData.attributes[1].charAt(0).toUpperCase() + props.barGraphData.attributes[1].slice(1)}</MenuItem>
  //         <MenuItem value='2'>{props.barGraphData.attributes[2].charAt(0).toUpperCase() + props.barGraphData.attributes[2].slice(1)}</MenuItem>
          
          
  //       </Select>
  //       <FormHelperText>Select any Attribute</FormHelperText>
  //     </FormControl>
      

  //        </form>
  //    )
  //  }
  console.log("The statSTate is" + JSON.stringify(statState)+"  sleepy "+ statState.statType.length)

      
        return (

            

           <div id="chart">
             {
              statTypeComponent
               }
            <Chart options={state.options} series={state.series} type="bar" height="350" />

          </div>


         )};


    