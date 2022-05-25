// DOWNLOAD TEMPLATE BUTTON

// CHOOSE FILE BUTTON
// Gives functionality to 'Choose File'
var button = document.getElementById('fileBtn');
button.addEventListener('click', select);

function select() {
    console.log('Should open file dialog');
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e) => {
        // Getting a hold of the file reference
        var file = e.target.files[0];

        // Setting up the reader
        var reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        // Writes string read from file to variable called csvString
        reader.onload = (readerEvent) => {
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
        };
    };
    input.click();
}
// CHOOSE FILE BUTTON

// UPLOAD BUTTON
// Gives functionality to upload
var button = document.getElementById('uploadBtn');
button.addEventListener('click', upload);
function upload() { }
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
    /*
              for (i = 0; i < grid.length; i++) {
                  for (k = 0; k < grid[i][k].length; k++) {
                      console.log(`INDEX: ${i} ROW CONTENTS: ${grid[i][k]}`);
                  }
              }
              */

    format();

    //_________________________________________________________________________//

    // in order to run the format() function you must have a 2 dimensional array
    // in this example the array is called "studentArray" but should be changed to fit
    // formatter
    function format() {
        var labels = [];
        // iterate through each core element (other than the top row)
        for (var i = 1; i < grid.length; i++) {
            var row = grid[i];
            for (var o = 1; o < row.length; o++) {
                // find labels in the middle (not names)
                labels.push(row[o]);
            }
        }

        // remove duplicates from the array
        var labels = labels.filter(removeDuplicates);

        // filter numbers out of the array
        var labels = labels.filter(removeNumbers);

        // labels list is complete

        // create a map that holds labels + names
        const hnxMap = new Map();

        // for each label in the list find the names that go with them
        for (var x = 0; x < labels.length; x++) {
            // create a list of names that go with the label
            var names = [];
            // iterate through the values
            for (var z = 1; z < grid.length; z++) {
                var row = grid[z];
                for (var y = 1; y < row.length; y++) {
                    // if this value is the label that is being looked at
                    if (row[y] == labels[x]) {
                        // add the name corrisponding to the label to its list
                        names.push('"' + row[0] + '"');
                    }
                }
            }

            // add the list and the label to the map
            hnxMap.set(labels[x], names);
        }

        // print results in csv format for the widget
        // declare counters and text
        var counter = 0;
        var text1 = '';
        var text = '';

        // print brackets on the beginning and the end
        for (let [key, value] of hnxMap) {
            // for each key and value of the map, iterate the counter
            // print the key and values
            counter++;
            text1 = '"' + key + '"' + ' : ' + '[' + value + ']';

            // if this is the not the last row put a comma at the end of the row
            if (counter != labels.length) {
                text1 += ',';
            }

            // print the line of text
            text = text + text1;
        }
        text1 = '{\n' + text + '\n}';
        // FINAL OUTPUT
        localStorage.kienText = text1;
    }

    // removeDuplicates uses the filter function to return only unique values within an array
    function removeDuplicates(value, index, self) {
        return self.indexOf(value) === index;
    }

    function removeNumbers(value, index) {
        if (isNaN(value.charAt(0))) {
            return index;
        }
    }

    // Textarea used as my visual tester
    /*
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
              */
    // FINAL OUTPUT
    textarea.value = localStorage.kienText;
});

export default varsITy;