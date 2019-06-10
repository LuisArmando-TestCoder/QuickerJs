const fs = require('fs');
const getInfo = require('./getSheets');

function createJSONFile(d) {
    fs.writeFileSync('data.json', JSON.stringify(d), 'utf8');
}

function getData() {
    getInfo({
        id: '1w_hH5ZBDUd1mGgYMq90JB0NrvXqo4NKPyNFvZwH-o2E',
        jsonPath: './test-1-spread-a5b1c990a32d.json',
        callback: createJSONFile,
        wanted: ['name', 'career', 'generation', 'portfolio', 'social', 'avatar'],
        type: 'array'
    });
}

setInterval(getData, 1e4);