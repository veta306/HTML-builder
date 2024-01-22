const fs = require('fs').promises;
const path = require('path');

const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const projectPath = path.join(__dirname, 'project-dist');
const projectAssetsPath = path.join(projectPath, 'assets');

async function bundleProject() {
  await fs.rm(projectPath, { recursive: true, force: true });
  await fs.mkdir(projectPath);
  await copyAssets(assetsPath, projectAssetsPath);
  await mergeStyles();
  await modifyTemplate();
}
async function copyAssets(originalPath, copyPath) {
  await fs.mkdir(copyPath);
  const files = await fs.readdir(originalPath);
  for (const filename of files) {
    const filePath = path.join(originalPath, filename);
    const copyFilePath = path.join(copyPath, filename);
    const stats = await fs.stat(filePath);
    if (stats.isFile()) {
      await fs.copyFile(filePath, copyFilePath);
    } else {
      await copyAssets(filePath, copyFilePath);
    }
  }
}
async function mergeStyles() {
  const outputStyle = path.join(
    path.join(__dirname, 'project-dist', 'style.css'),
  );
  const files = await fs.readdir(stylesPath);
  for (const filename of files) {
    const filePath = path.join(stylesPath, filename);
    const input = await fs.readFile(filePath);
    await fs.appendFile(outputStyle, input);
  }
}
async function modifyTemplate() {
  const htmlPath = path.join(__dirname, 'project-dist', 'index.html');
  let html = await fs.readFile(path.join(__dirname, 'template.html'));
  const files = await fs.readdir(componentsPath);
  for (const filename of files) {
    const filePath = path.join(componentsPath, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    const componentName = `{{${path.basename(
      filePath,
      path.extname(filePath),
    )}}}`;
    html = html.toString().replaceAll(componentName, data);
  }
  await fs.writeFile(htmlPath, html);
}
bundleProject();
