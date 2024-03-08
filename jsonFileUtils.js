const fs = require('fs');

// Function to read JSON file synchronously
function readJSONSync(filePath) {
  try {
    // Read the JSON file synchronously
    const data = fs.readFileSync(filePath, 'utf8');
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}

// Function to read JSON file asynchronously
function readJSONAsync(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      callback(err, null);
      return;
    }
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      callback(parseErr, null);
    }
  });
}

function writeJSON(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log(`Data written to ${filePath}`);
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

module.exports = {
  readJSONSync,
  readJSONAsync,
  writeJSON
};
