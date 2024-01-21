const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(textPath);
let text = '';
stream.on('data', (data) => (text += data));
stream.on('end', () => console.log(text));
