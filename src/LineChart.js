import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

var seriesData = [];

export default function LineChart(props) {
  seriesData = []; // this variable stores all the line graph data
  //which is used by this component for plotting purposes.
  //Each element of this array stores label and data for each sensor set
  //A sensor set contains all the sensors that were selected in one CampusList component
  //Each set represents aggregation of all those sensors.

  const [values, setValues] = React.useState({
    statType: "mean",
    attType: "0"
  });

  const classes = useStyles();

  function handleStatTypeChange(event) {
    //This changes the state based on what
    //stat type user has selected
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleAttributeChange(event) {
    //This changes the state based on what
    //attribute user has selected
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  for (var k = 0; k < props.graphData.bar_data.length; k++) {
    seriesData.push({
      name: props.comparisonLabels.sensorList_Array[k].label,
      data:
        props.graphData.bar_data[k].values[parseInt(values.attType)][
          values.statType
        ]
    });
  }
  const [state, setState] = React.useState({
    options: {
      chart: {
        shadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 1
        },
        toolbar: {
          show: false
        }
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: props.graphData.bar_data[0].labels,
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Temperature"
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },
    series: seriesData
  });

  useEffect(() => {
    seriesData = []; //this ARRAY stores all the line chart data
    //which is used by this component for plotting purposes.
    //Each element of this array stores objects for the data of each and every set
    //A set is a sensor set of all the sensors that were selected in one CampusList component
    //Each set represents aggregation of all those sensors.

    for (var k = 0; k < props.graphData.bar_data.length; k++) {
      seriesData.push({
        name: props.comparisonLabels.sensorList_Array[k].label,
        data:
          props.graphData.bar_data[k].values[parseInt(values.attType)][
            values.statType
          ]
      });
    }

    setState({
      options: {
        chart: {
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: "smooth"
        },
        title: {
          text: "Average High & Low Temperature",
          align: "left"
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 6
        },
        xaxis: {
          categories: props.graphData.bar_data[0].labels,
          title: {
            text: "Time"
          }
        },
        yaxis: {
          title: {
            text: "Temperature"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      series: seriesData
    });
  }, [values.attType]);

  useEffect(() => {
    //This changes the data plotted in graphs according to stat type and
    //attribute selected by the user from drop-down menu for each set.
    seriesData = [];

    for (var k = 0; k < props.graphData.bar_data.length; k++) {
      seriesData.push({
        name: props.comparisonLabels.sensorList_Array[k].label,
        data:
          props.graphData.bar_data[k].values[parseInt(values.attType)][
            values.statType
          ]
      });
    }

    setState({
      options: {
        chart: {
          shadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 1
          },
          toolbar: {
            show: false
          }
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: "smooth"
        },
        title: {
          text: "Predator Prey",
          align: "left"
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5
          }
        },
        markers: {
          size: 6
        },
        xaxis: {
          categories: props.graphData.bar_data[0].labels,
          title: {
            text: "TimeStamp"
          }
        },
        yaxis: {
          title: {
            text: "Temperature"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
      series: seriesData
    });
  }, [values.statType]);

  return (
    <div id="chart">
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="statType-helper">StatType</InputLabel>
          <Select
            value={values.statType}
            onChange={handleStatTypeChange}
            input={<Input name="statType" id="statType-helper" />}
          >
            <MenuItem value="mean">Mean</MenuItem>
            <MenuItem value="median">Median</MenuItem>
            <MenuItem value="max">Maximum</MenuItem>
            <MenuItem value="min">Minimum</MenuItem>
            <MenuItem value="variance">Variance</MenuItem>
            <MenuItem value="stddev">Stddev</MenuItem>
          </Select>
          <FormHelperText>Select any Stat type</FormHelperText>
        </FormControl>
      </form>

      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="attType-helper">Attribute</InputLabel>
          <Select
            value={values.attType}
            onChange={handleAttributeChange}
            input={<Input name="attType" id="attType-helper" />}
          >
            <MenuItem value="0">
              {props.graphData.attributes[0].charAt(0).toUpperCase() +
                props.graphData.attributes[0].slice(1)}
            </MenuItem>
            <MenuItem value="1">
              {props.graphData.attributes[1].charAt(0).toUpperCase() +
                props.graphData.attributes[1].slice(1)}
            </MenuItem>
            <MenuItem value="2">
              {props.graphData.attributes[2].charAt(0).toUpperCase() +
                props.graphData.attributes[2].slice(1)}
            </MenuItem>
          </Select>
          <FormHelperText>Select any Attribute</FormHelperText>
        </FormControl>
      </form>

      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height="500"
      />
    </div>
  );
}
