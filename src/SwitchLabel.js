import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabel() {
  const [labelstate, setlabelState] = React.useState({
    barGraph: true,
    lineGraph: false,
    heatMap:false,
    scatterPlot: false
  });

  const handleChange = name => event => {
    setlabelState({ ...labelstate, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      {/* <FormControlLabel
        control={
          <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
        }
        label="Secondary"
      /> */}
      <FormControlLabel
        control={
          <Switch
            checked={labelstate.barGraph}
            onChange={handleChange('barGraph')}
            value="barGraph"
            color="secondary"
          />
        }
        label="Bar Graph"
      />
       <FormControlLabel
        control={
          <Switch
            checked={labelstate.lineGraph}
            onChange={handleChange('lineGraph')}
            value="lineGraph"
            color="secondary"
          />
        }
        label="Line Graph"
      />
       <FormControlLabel
        control={
          <Switch
            checked={labelstate.heatMap}
            onChange={handleChange('heatMap')}
            value="heatMap"
            color="secondary"
          />
        }
        label="Heat Map"
      />
       <FormControlLabel
        control={
          <Switch
            checked={labelstate.scatterPlot}
            onChange={handleChange('scatterPlot')}
            value="scatterPlot"
            color="secondary"
          />
        }
        label="Scatter Plot"
      />
      {/* <FormControlLabel control={<Switch value="checkedC" />} label="Uncontrolled" /> */}
      {/* <FormControlLabel disabled control={<Switch value="checkedD" />} label="Disabled" />
      <FormControlLabel disabled control={<Switch checked value="checkedE" />} label="Disabled" /> */}
    </FormGroup>
  );
}