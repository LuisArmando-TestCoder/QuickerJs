// follow https://github.com/theoephraim/node-google-spreadsheet

function getInfo({id, jsonPath, callback, wanted, type = 'object'}) {
    // should be an array con desire props
    const Gss = require('google-spreadsheet'); // npm install google-spreadsheet
    const doc = new Gss(id);
    const creds = require(jsonPath);
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet.
        doc.getRows(1, function (er, rows) {
            if(!wanted) {
                // if the prop is not specified throw the raw response
                return callback(rows);
            }
            if (type === 'object') {
                let obj = {}; 
                wanted.forEach((key) => {
                    obj[key] = [];
                    rows.forEach((row) => {
                        obj[key].push(row[key]);
                    });
                });
                return callback(obj);
            } else if (type === 'array') {
                let array = [];
                rows.forEach((row) => {
                    let obj = {};
                    wanted.forEach((key) => {
                        obj[key] = row[key];
                    });
                    array.push(obj);
                });
                return callback(array);
            }
        });
    });
}

// function c(s) {
//     console.log(s);
// }

module.exports = getInfo;

// getInfo({
//     id: '1w_hH5ZBDUd1mGgYMq90JB0NrvXqo4NKPyNFvZwH-o2E',
//     jsonPath: './test-1-spread-a5b1c990a32d.json',
//     callback: c,
//     wanted: ['age', 'name', 'year', 'career'],
//     type: 'array'
// });