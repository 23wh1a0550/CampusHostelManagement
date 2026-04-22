const fs = require('fs');

// Write data to file
fs.writeFileSync('hostel.txt', 'Hostel A - 50 beds\n');

// Append more data
fs.appendFileSync('hostel.txt', 'Hostel B - 30 beds\n');

//  Read file data
const data = fs.readFileSync('hostel.txt', 'utf-8');

//  Display output
console.log(data);