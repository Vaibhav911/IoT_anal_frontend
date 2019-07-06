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

var seriesData = [];

 export default function  GroupedBar(props) {

  console.log("Props in grouped bar are" + JSON.stringify(props))
seriesData=[];
  
// var stateAttType =[];

// for(var k=0;k<props.graphData.bar_data.length;k++)
// {
//   var string ='attType'
//   string = string.concat(k.toString)
//   stateAttType.push({ {string} : '0'})
// }
// console.log(stateAttType)

  const classes = useStyles();
  const [values, setValues] = React.useState({
    statType: 'mean',
    attType : '0'
  });
console.log("xxxxxx" + JSON.stringify(values))
  // console.log(values)
  for(var k=0;k< props.graphData.bar_data.length;k++)
  {
    seriesData.push({
      name:props.comparisonLabels.sensorList_Array[k].label,
      data: props.graphData.bar_data[k].values[parseInt(values.attType)][values.statType]
    })
  }
  

  console.log("rtrtrtrt"+ JSON.stringify(seriesData))



  const inputLabel = React.useRef(null);
//   const [labelWidth, setLabelWidth] = React.useState(0);
//   React.useEffect(() => {
//     setLabelWidth(inputLabel.current.offsetWidth);
//   }, []);

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
    console.log("The frequency is " + event.target.name)
    console.log("The frequency is " + event.target.value)
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
      // console.log("size of labels is" + JSON.stringify(props.graphData.graphData.data[0].labels))
      // console.log("size of values is" + JSON.stringify(props.graphData.graphData.data[0].values[0].mean))
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
          categories: props.graphData.bar_data[0].labels,
        }
      },
      series: seriesData,


   });


   useEffect(()=>{
    seriesData=[];
    for(var k=0;k< props.graphData.bar_data.length;k++)
  {
    seriesData.push({
      name:props.comparisonLabels.sensorList_Array[k].label,
      data: props.graphData.bar_data[k].values[parseInt(values.attType)][values.statType]
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
          categories: props.graphData.bar_data[0].labels,
        }
      },
      series: seriesData,


    })



   },[values.statType])
         





   useEffect(()=>{
seriesData=[];
    for(var k=0;k< props.graphData.bar_data.length;k++)
  {
    seriesData.push({
      name:props.comparisonLabels.sensorList_Array[k].label,
      data: props.graphData.bar_data[k].values[parseInt(values.attType)][values.statType]
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
          categories: props.graphData.bar_data[0].labels,
        }
      },
      series: 
        seriesData ,


    })



   },[values.attType])
   



  //  var attTypeArray =[]
  //  for(var i =0;i<props.graphData.bar_data.length;i++)
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
  //         <MenuItem value='0'>{props.graphData.attributes[0].charAt(0).toUpperCase() + props.graphData.attributes[0].slice(1)}</MenuItem>
  //         <MenuItem value='1'>{props.graphData.attributes[1].charAt(0).toUpperCase() + props.graphData.attributes[1].slice(1)}</MenuItem>
  //         <MenuItem value='2'>{props.graphData.attributes[2].charAt(0).toUpperCase() + props.graphData.attributes[2].slice(1)}</MenuItem>
          
          
  //       </Select>
  //       <FormHelperText>Select any Attribute</FormHelperText>
  //     </FormControl>
      

  //        </form>
  //    )
  //  }
      
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
                 {/* {attTypeArray} */}


                 <form className={classes.root} autoComplete="off">
      
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="attType[i]-helper">{props.comparisonLabels.sensorList_Array[0].label}</InputLabel>
        <Select
          value={values.attType}
          onChange={handleChange}
          input={<Input name='attType' id="attType-helper" />}
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


                 


            <Chart options={state.options} series={state.series} type="bar" height="350" />
          </div>


         )};


    