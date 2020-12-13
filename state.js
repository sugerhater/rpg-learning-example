const fs = require('fs');
const util = require('util');

// Attempt to read the state file, and parse it into an object to return to caller.
const read = (callback) => fs.readFile("save.json", (err, state) => {
    if (err) {
        // File could not be read... not found, bad permissions, out of file descriptors on OS...
        return callback(err)
    }
    try {
        // Attempt to parse the contents of the state file.
        return callback(null, JSON.parse(state));
    } catch (err) {
        // Unable to parse, return the error to caller.
        return callback(err);
    }
});

// Write the stringified state object to the save file.
const write = (state, callback) => fs.writeFile("save.json", JSON.stringify(state, null, 2), callback);

// Delete the save file.
const del = (callback) => fs.unlink("save.json", callback);

module.exports = {
    read: util.promisify(read),
    write: util.promisify(write),
    del: util.promisify(del)
};
