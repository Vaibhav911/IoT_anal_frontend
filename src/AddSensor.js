import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import SensorDataType from './SensorDataType'
import { Button } from '@material-ui/core';


const suggestions = [
];


async function getLabels()
{
  var link = "http://localhost:5000/getlabels";
  await axios.get(link).then(res => {
    console.log('data receivede '+ JSON.stringify(res.data.locationLabels))
    // suggestions= res.data.loctionLabels;a
    for(var i=0;i<res.data.locationLabels.length;i++)
    {
      // if(res.data)
      // suggestions.push(res.data.locationLabels[i])
      console.log("Labels is" + JSON.stringify(res.data.locationLabels[i]))
      if (!res.data.locationLabels[i].label)
      {
        console.log("label attribute is not there")
        continue;
      }
            suggestions.push(res.data.locationLabels[i])
// 
    }

    
  })
}
async function callGetLabels()
{
  await getLabels();
}

callGetLabels();
console.log('suggestions are '+ JSON.stringify(suggestions))

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function AddSensor() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    campus: '',
    building:'',
    floor:'',
    zone:'',
    sensorType:'',
    sensorId:''
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
    console.log("You have typed to " + name+" value "+ newValue)

  };
  
  function handleSubmit()
  {
    
    // window.handleSubmit = 
    console.log("Location Labels" + JSON.stringify(state))
    console.log("Sensor Data Type :" + JSON.stringify(window.sensorDataType))
    var link = 'http://localhost:5000/storesensor?'
    +'campus='+state.campus
    +'&building='+state.building
    +'&floor='+state.floor
    +'&zone='+state.zone
    +'&sensorId='+state.sensorId
    +'&sensorType='+state.sensorType
    +'&sensorDataType='+window.sensorDataType;

    console.log('link is ' + link);


    axios.get(link).then(res => {
      console.log("res is " + JSON.stringify(res));
    });
  }

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'campus',
          placeholder: 'Search a campus',
          value: state.campus,
          onChange: handleChange('campus'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Building',
          placeholder: 'Search a Building',
          value: state.building,
          onChange: handleChange('building'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Floor',
          placeholder: 'Search a Floor',
          value: state.floor,
          onChange: handleChange('floor'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Zone',
          placeholder: 'Search a Zone',
          value: state.zone,
          onChange: handleChange('zone'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Sensor Type',
          placeholder: 'Search a Sensor Type',
          value: state.sensorType,
          onChange: handleChange('sensorType'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          id: 'react-autosuggest-simple',
          label: 'Sensor ID',
          placeholder: 'Search a Sensor ID',
          value: state.sensorId,
          onChange: handleChange('sensorId'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <SensorDataType></SensorDataType>
      <div className={classes.divider} />
      <div>
           <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </div>
    </div>
  );
}
