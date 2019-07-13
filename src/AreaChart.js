//this file is used to plot area charts.  This component is currently not in use.
//For reference visit APexCHarts/Area
import React from "react";
import ReactApexChart from "react-apexcharts";

export default function AreaChart(props) {
  const [state, setState] = React.useState({
    options: {
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "Counts",
        categories: props.graphData.histogram_data.labels[0]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    },
    series: [
      {
        name: "series1",
        data: props.graphData.histogram_data.counts[0]
      }
    ]
  });

  return (
    <div id="Achart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height="350"
      />
    </div>
  );
}
