const path = require('path');
const fs = require('fs').promises;

const dirPath = path.join(__dirname, 'secret-folder');
async function showFiles() {
  const files = await fs.readdir(dirPath);
  for (const filename of files) {
    const filePath = path.join(dirPath, filename);
    const stats = await fs.stat(filePath);
    if (stats.isFile())
      console.log(
        path.basename(filePath, path.extname(filePath)) +
          ' - ' +
          path.extname(filePath).split('.')[1] +
          ' - ' +
          (stats.size / 1024).toFixed(2) +
          'kb',
      );
  }
}
showFiles();
