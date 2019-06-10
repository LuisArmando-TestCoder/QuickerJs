// follow https://github.com/theoephraim/node-google-spreadsheet
// remember to --> npm install google-spreadsheet
function getInfo({id, jsonPath, callback, wanted, type = 'object'}) {
    // should be an array con desire props
    const Gss = require('google-spreadsheet');
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

module.exports = getInfo;
