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
    display: "inline",
    flexDirection: "row",
    height: "100px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

var seriesData = []; //

export default function GroupedBar(props) {
  const classes = useStyles();
  var statType = []; //Each element of thit array stores stat type as
  //mean and 0th attrib
  var selectStatType = [];
  var statTypeComponent = [];
  for (var i = 0; i < props.barGraphData.length; i++) {
    if (props.barGraphData[i].data_type == "quantitative") {
      statType.push({
        stats: "mean",
        attribute: props.barGraphData[i].attributes[0]
      });

      selectStatType.push({
        stats: "set-" + JSON.stringify(i) + "att-" + JSON.stringify(0),
        attribute: "set-" + JSON.stringify(i) + "att-" + JSON.stringify(0)
      });

      for (var i = 0; i < statState.statType.length; i++) {
        statTypeComponent.push(
          <div className={classes.root}>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="statType-helper">StatType</InputLabel>
                <Select
                  value={statState.statType}
                  onChange={handleChange}
                  input={
                    <Input
                      name={JSON.stringify(i) + "statType"}
                      id="statType-helper"
                    />
                  }
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
                <InputLabel htmlFor="attType[i]-helper">
                  {props.comparisonLabels.sensorList_Array[0].label}
                </InputLabel>
                <Select
                  value={statState.attType}
                  onChange={handleChange}
                  input={
                    <Input
                      name={JSON.stringify(i) + "attType"}
                      id="attType-helper"
                    />
                  }
                >
                  <MenuItem
                    value={
                      "set-" + JSON.stringify(i) + "att-" + JSON.stringify(0)
                    }
                  >
                    {props.barGraphData[0].attributes[0]
                      .charAt(0)
                      .toUpperCase() +
                      props.barGraphData[0].attributes[0].slice(1)}
                  </MenuItem>
                  <MenuItem
                    value={
                      "set-" + JSON.stringify(i) + "att-" + JSON.stringify(1)
                    }
                  >
                    {props.barGraphData[0].attributes[1]
                      .charAt(0)
                      .toUpperCase() +
                      props.barGraphData[0].attributes[1].slice(1)}
                  </MenuItem>
                  <MenuItem
                    value={
                      "set-" + JSON.stringify(i) + "att-" + JSON.stringify(2)
                    }
                  >
                    {props.barGraphData[0].attributes[2]
                      .charAt(0)
                      .toUpperCase() +
                      props.barGraphData[0].attributes[2].slice(1)}
                  </MenuItem>
                </Select>
                <FormHelperText>Select any Attribute</FormHelperText>
              </FormControl>
            </form>
          </div>
        );
      }
    } else {
      statType.push({
        stats: "non_percentage",
        attribute: props.barGraphData[i].attributes[0]
      });
    }

    for (var i = 0; i < statState.statType.length; i++) {
      statTypeComponent.push(
        <div>
          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="statType-helper">StatType</InputLabel>
              <Select
                value={statState.statType}
                onChange={handleChange}
                input={
                  <Input
                    name={JSON.stringify(i) + "statType"}
                    id="statType-helper"
                  />
                }
              >
                <MenuItem value="Non-percentage">Mean</MenuItem>
                <MenuItem value="Percentage">Median</MenuItem>
              </Select>
              <FormHelperText>Select any Stat type</FormHelperText>
            </FormControl>
          </form>

          <form className={classes.root} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="attType[i]-helper">
                {props.comparisonLabels.sensorList_Array[0].label}
              </InputLabel>
              <Select
                value={statState.attType}
                onChange={handleChange}
                input={
                  <Input
                    name={JSON.stringify(i) + "attType"}
                    id="attType-helper"
                  />
                }
              >
                <MenuItem
                  value={
                    "set-" + JSON.stringify(i) + "att-" + JSON.stringify(0)
                  }
                >
                  {props.barGraphData[0].attributes[0].charAt(0).toUpperCase() +
                    props.barGraphData[0].attributes[0].slice(1)}
                </MenuItem>
                <MenuItem
                  value={
                    "set-" + JSON.stringify(i) + "att-" + JSON.stringify(1)
                  }
                >
                  {props.barGraphData[0].attributes[1].charAt(0).toUpperCase() +
                    props.barGraphData[0].attributes[1].slice(1)}
                </MenuItem>
              </Select>
              <FormHelperText>Select any Attribute</FormHelperText>
            </FormControl>
          </form>
        </div>
      );
    }
  }

  const [statState, setStatState] = React.useState({
    statType: statType,
    selectStatType: selectStatType
  });

  seriesData = [];
  for (var k = 0; k < props.barGraphData.length; k++) {
    seriesData.push({
      name: props.comparisonLabels.sensorList_Array[k].label,
      data: props.barGraphData[k].bar_data[0].values[0].mean
    });
  }

  function handleChange(event) {
    var statType = statState.statType;
    if (event.target.name[1] == "a") {
      var setIndex = parseInt(event.target.value[4]);
      var attrIndex = parseInt(event.target.value[9]);
      statType[parseInt(event.target.name[0])].attribute =
        props.barGraphData[setIndex].attributes[attrIndex];
    }
    setStatState(oldValues => ({
      ...oldValues,
      statType: statType
    }));
  }

  const [state, setState] = React.useState({
    options: {
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: props.barGraphData[0].bar_data[0].labels
      }
    },
    series: seriesData
  });

  useEffect(() => {
    seriesData = [];
    for (var k = 0; k < props.barGraphData.length; k++) {
      seriesData.push({
        name: props.comparisonLabels.sensorList_Array[k].label,
        data:
          props.barGraphData[k].bar_data[0].values[0].statState.statType[k]
            .stats
      });
    }
    setState({
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: props.barGraphData[0].bar_data[0].labels
        }
      },
      series: seriesData
    });
  }, [statState.statType]);

  return (
    <div id="chart">
      {statTypeComponent}
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height="350"
      />
    </div>
  );
}
