const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'secret-folder');
fs.readdir(dirPath, (error, files) => {
  if (error) return console.log(error.message);
  files.forEach((filename) => {
    const filePath = path.join(dirPath, filename);
    fs.stat(filePath, (error, stats) => {
      if (error) return console.log(error.message);
      if (stats.isFile()) {
        console.log(
          path.basename(filePath, path.extname(filePath)) +
            ' - ' +
            path.extname(filePath).split('.')[1] +
            ' - ' +
            (stats.size / 1024).toFixed(2) +
            'kb',
        );
      }
    });
  });
});
