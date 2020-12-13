const fs = require('fs');
const util = require('util');

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

// When called, returns a promise that resolves the saved state object.
// Rejects if file cannot be read... permissions, not found, not enough descriptors, etc.
const read = () => readFilePromise("save.json");

const write = (state) => writeFilePromise("save.json", JSON.stringify(state));

module.exports = {
    read,
    write
};