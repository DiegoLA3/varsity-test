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
        <script> {
        const csvFileData =
            [
                ['Brazil', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '171%', 'Above Average'],
                ['Egypt', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '320%', 'Above Average'],
                ['Indonesia', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '133%', 'Above Average'],
                ['Japan', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'UA', '143%', 'Above Average'],
                ['Viet Nam', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Decrease', 'RUS', '233%', 'Above Average'],
                ['Republic of Korea', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'UA', '208%', 'Above Average'],
                ['United Kingdom', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Decrease', 'UA', '138%', 'Above Average'],
                ['China', '2020/21', 'Net Importer', 'Surplus', 'Stock Decrease', 'RUS', '221%', 'Above Average'],
                ['Nigeria', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Decrease', 'RUS', '11%', 'Below Average'],
                ['South Africa', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Decrease', 'RUS', '41%', 'Below Average'],
                ['Thailand', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '84%', 'Below Average'],
                ['Mexico', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '58%', 'Below Average'],
                ['Philippines', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '95%', 'Below Average'],
                ['Saudi Arabia', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Increase', 'RUS', '46%', 'Below Average'],
                ['Turkey', '2020/21', 'Net Importer', 'Import Dependent', 'Stock Decrease', 'RUS', '62%', 'Below Average'],
                ['Australia', '2020/21', 'Net Exporter', 'Surplus', 'Stock Decrease', 'UA', '48%', 'Below Average'],
                ['Canada', '2020/21', 'Net Exporter', 'Surplus', 'Stock Decrease', 'UA', '63%', 'Below Average'],
                ['European Union', '2020/21', 'Net Exporter', 'Surplus', 'Stock Increase', 'UA', '87%', 'Below Average'],
                ['Argentina', '2020/21', 'Net Exporter', 'Surplus', 'Stock Increase', 'RUS', '27%', 'Below Average'],
                ['India', '2020/21', 'Net Exporter', 'Surplus', 'Stock Decrease', 'RUS', '98%', 'Below Average'],
                ['Kazakhstan', '2020/21', 'Net Exporter', 'Surplus', 'Stock Decrease', 'RUS', '5%', 'Below Average'],
                ['Russian Federation', '2020/21', 'Net Exporter', 'Surplus', 'Stock Decrease', 'RUS', '12%', 'Below Average'],
                ['Ukraine', '2020/21', 'Net Exporter', 'Surplus', 'Stock Increase', 'UA', '37%', 'Below Average'],
                ['United States of America', '2020/21', 'Net Exporter', 'Surplus', 'Stock Increase', 'UA', '72%', 'Below Average'],
            ];

        var button = document.getElementById('templateBtn');
        button.addEventListener('click', download);
        function download() {
            console.log('Should download template');

            // Define the heading for each row of the data
            var csv = 'Country,Year,NET-Import-Exp,Surplus-Deficit,YOY-Stock Decrease in Stock,Leans,FertUsePercentAvg,FertUseBucket\n';

            // Merge the data with CSV
            csvFileData.forEach(function (row) {
                csv += row.join(',');
                csv += "\n";
            });

            // Display the created CSV data on the web browser
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';

            // Provide the name for the CSV file to be downloaded
            hiddenElement.download = 'DataTemplate.csv'
            hiddenElement.click();
        }
        // DOWNLOAD TEMPLATE BUTTON

        // CHOOSE FILE BUTTON
        // Gives functionality to 'Choose File'
        var button = document.getElementById('fileBtn');
        button.addEventListener('click', select);

        function select() {
            console.log('Should open file dialog');
            var input = document.createElement('input');
            input.type = 'file';

            input.onchange = e => {

                // Getting a hold of the file reference
                var file = e.target.files[0];

                // Setting up the reader
                var reader = new FileReader();
                reader.readAsText(file, 'UTF-8');

                // Writes string read from file to variable called csvString
                reader.onload = readerEvent => {
                    var csvString = readerEvent.target.result;
                    /* TEST CODE
                     * https://zetcode.com/javascript/exceljs/
                    const Excel = require('exceljs');
                    const wb = new ExcelJS.Workbook();
                    const ws = wb.addWorksheet('file');
                    localStorage.csvFile = ws;
                    TEST CODE */
                    // Stores csvString in the browser
                    localStorage.csvText = csvString;
                }
            }
            input.click();
        }
        // CHOOSE FILE BUTTON

        // UPLOAD BUTTON
        // Gives functionality to upload
        var button = document.getElementById('uploadBtn');
        button.addEventListener('click', upload);
        function upload() {
        }
        // UPLOAD BUTTON

        // FILE TEST
        var button = document.getElementById('displayBtn');
        var textarea = document.getElementById('testOutput');

        button.addEventListener('click', () => {
            console.log('Should be displaying text shortly...');
            // Reads in file and splits by line
            const lines = localStorage.csvText.split(/\r\n|\n/);

            // Should be able to insert any localStorage string here
            // and have it display in the text box

            // Headers stores an array of the column descriptors split by the comma
            const headers = lines[0].split(/[,]/);

            // Creates arrays for all rows
            const rows = [];
            for (i = 0; i < lines.length - 2; i++) {
                rows[i] = lines[i + 1].split(/[,]/);
            }

            // Creates two dimensional array
            var grid = new Array(lines.length);
            for (i = 0; i < lines.length; i++) {
                grid[i] = lines[i].split(/[,]/);
            }

            // Test to ensure elements are stored as arrays
            for (i = 0; i < grid.length; i++) {
                for (k = 0; k < grid[i][k].length; k++) {
                    console.log(`INDEX: ${i} ROW CONTENTS: ${grid[i][k]}`);
                }
            }
            // Textarea used as my visual tester
            var printer = headers.join(" * ");
            printer += "\n --------------------------------------------------------------------------------------------------------------- \n";
            for (i = 0; i < rows.length; i++) {
                //console.log(`Value of I is ${i}`);
                for (k = 0; k < rows[i].length; k++) {
                    printer += rows[i].join(" * ");
                    if (k = rows.length - 1) {
                        printer += "\n --------------------------------------------------------------------------------------------------------------- \n";
                    }
                }
            }
            textarea.value = printer;
        });
      }
      </script>
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

render(<Demo />, document.querySelector('#demo'));
