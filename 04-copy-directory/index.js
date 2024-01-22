const fs = require('fs');
const path = require('path');
const originalPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

fs.rm(copyPath, { recursive: true, force: true }, (error) => {
  if (error) return console.log(error.message);
  fs.mkdir(copyPath, (error) => {
    if (error) return console.log(error.message);
    fs.readdir(originalPath, (error, files) => {
      if (error) return console.log(error.message);
      files.forEach((filename) => {
        fs.copyFile(
          path.join(originalPath, filename),
          path.join(copyPath, filename),
          (err) => {
            if (err) {
              console.log('Error Found:', err);
            } else console.log('Copied ' + filename);
          },
        );
      });
    });
  });
});
