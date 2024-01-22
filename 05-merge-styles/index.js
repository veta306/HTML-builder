const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);
const stylesPath = path.join(__dirname, 'styles');
fs.readdir(stylesPath, (error, files) => {
  if (error) return console.log(error.message);
  files.forEach((filename) => {
    const filePath = path.join(stylesPath, filename);
    fs.stat(filePath, (error, stats) => {
      if (error) return console.log(error.message);
      if (stats.isFile() && path.extname(filePath).split('.')[1] === 'css') {
        const input = fs.createReadStream(filePath);
        input.pipe(output);
      }
    });
  });
});
