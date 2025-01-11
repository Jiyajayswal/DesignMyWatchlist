const fs = require('fs');
const path = require('path');

// Define the directory name
const dirName = path.join(__dirname, 'src');

// Check if the directory already exists
if (!fs.existsSync(dirName)) {
    // Create the directory
    fs.mkdirSync(dirName);
    console.log('The "src" directory has been created!');
} else {
    console.log('The "src" directory already exists.');
}
