const path = require('path');
const fs = require('fs').promises;
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

async function mergeStyles() {
  await fs.rm(bundlePath, { force: true });
  const files = await fs.readdir(stylesPath);
  for (const filename of files) {
    const filePath = path.join(stylesPath, filename);
    const stats = await fs.stat(filePath);
    if (stats.isFile() && path.extname(filePath).split('.')[1] === 'css') {
      const style = await fs.readFile(filePath);
      await fs.appendFile(bundlePath, style);
    }
  }
}
mergeStyles();
