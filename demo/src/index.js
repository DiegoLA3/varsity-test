import React from 'react';
import { render } from 'react-dom';

import { debounce } from 'lodash';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { HypernetxWidget } from '../../src/';

const defaultUserInput = `{
  "Tomato": ["Fruit", "TH"],
  "Taco": ["TH", "JV"],
  "10": ["BM", "FN", "JA"],
  "11": ["JV", "JU", "CH", "BM"],
  "0": ["JU", "CH", "BR", "CN", "CC", "JV", "BM"],
  "5": ["TH", "GP"],
  "6": ["GP", "MP"],
  "7": ["MA", "GP"]
}`;

const emitChange = debounce(
  (value, onChange) => onChange && onChange(value),
  300
);

function JSONTextField({ defaultValue, onChange, ...props }) {
  const [userValue, setUserValue] = React.useState(defaultValue);
  const [error, setError] = React.useState();

  const handleValidate = (value) => {
    try {
      // check that value can be parsed
      const parsedValue = JSON.parse(value);

      // check that object is the right schema
      if (typeof parsedValue === 'object' && !Array.isArray(parsedValue)) {
        const invalid = Object.entries(parsedValue).filter(
          ([k, v]) => !Array.isArray(v)
        );

        if (Object.keys(parsedValue).length === 0) {
          setError('Input is empty');
        } else if (invalid.length) {
          setError(`Values for {${invalid[0][0]}} are not arrays of strings`);
        } else {
          emitChange(parsedValue, onChange);
          setError(undefined);
        }
      } else {
        setError('Input is not an Object');
      }
    } catch (e) {
      setError(String(e));
    }
  };

  const handleChange = (ev) => {
    const value = ev.target.value;

    setUserValue(value);
    handleValidate(value);
  };

  return (
    <TextField
      fullWidth
      error={Boolean(error)}
      label={error || 'Valid'}
      value={userValue}
      onChange={handleChange}
      {...props}
    />
  );
}

function Demo() {
  const [incidenceDict, setIncidenceDict] = React.useState(
    JSON.parse(defaultUserInput)
  );

  const nodesSet = new Map();
  const edges = Object.entries(incidenceDict).map(([uid, elements]) => {
    elements.forEach((uid) => {
      nodesSet.set(uid, { uid });
    });

    return { uid, elements };
  });

  const nodes = Array.from(nodesSet.values());

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>
          <div class="container" id="file">
            <div id="fileTemplate">
              <h4> File template component </h4>
              <div id="template">
                <button id="templateBtn" onclick="download">
                  Download Template
                </button>
              </div>
            </div>
            <div id="fileUpload">
              <h4> File upload component </h4>
              <div id="ctrlBar">
                <button id="fileBtn">Choose File</button>
                <button id="uploadBtn">Upload</button>
              </div>
            </div>
            <div id="fileTest">
              <h4>File test component</h4>
              <div id="displayTest">
                <button id="displayBtn">Display</button>
                <textarea cols="40" rows="20" id="testOutput"></textarea>
              </div>
            </div>
          </div>
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <JSONTextField
          onChange={setIncidenceDict}
          defaultValue={defaultUserInput}
          multiline
          rows={10}
        />
      </Grid>

      <Grid item xs={12}>
        <HypernetxWidget {...{ nodes, edges }} />
      </Grid>
    </Grid>
  );
}

var button = document.getElementById('fileBtn');
button.onClick(select);
function select() {
  window.alert('Button has been clicked');
}
render(<Demo />, document.querySelector('#demo'));
