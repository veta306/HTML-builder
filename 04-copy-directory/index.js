const fs = require('fs').promises;
const path = require('path');
const originalPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  await fs.rm(copyPath, { recursive: true, force: true });
  await fs.mkdir(copyPath);
  const files = await fs.readdir(originalPath);
  for (const filename of files) {
    await fs.copyFile(
      path.join(originalPath, filename),
      path.join(copyPath, filename),
    );
  }
}
copyDir();
