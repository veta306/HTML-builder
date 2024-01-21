const fs = require('fs');
const path = require('path');
const { stdin } = process;
const textPath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(textPath);

console.log('Hello! Enter your text:');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') endProcess();
  else output.write(data);
});
process.on('SIGINT', endProcess);

function endProcess() {
  console.log('Bye!');
  process.exit();
}
