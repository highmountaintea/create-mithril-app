#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');

async function main(folder) {
  let modulefolder = __dirname;
  // console.log(modulefolder);
  let sampleFolder = path.join(modulefolder, 'node_modules/sample-mithril-app');
  // console.log(sampleFolder);
  // process.exit(1);
  // create folder, error out if already exists
  try {
    await fs.mkdir(folder);
  } catch (e) {
    try {
      let files = await fs.readdir(folder);
      // console.log(files);
      let invalidFiles = files.filter(f => !['.git'].includes(f));
      // console.log(invalidFiles);
      if (invalidFiles.length > 0) throw new Error('directory not empty');
    } catch (e2) {
      console.error(e.message);
      console.error(`Unable to create directory '${folder}'.`);
      console.error(`create-mithril-app will only proceed if the target directory is empty or does not exist.`);
      process.exit(1);  
    }
  }
  // copy sampleApp over
  try {
    await fs.copy(sampleFolder, folder);
    let { scripts, dependencies, devDependencies } = JSON.parse(await fs.readFile(path.join(folder, 'package.json')));
    let packageJson = { name: 'sample-mithril-app', version: '0.1.0', scripts, dependencies, devDependencies };
    await fs.writeFile(path.join(folder, 'package.json'), JSON.stringify(packageJson, null, '  '));
    await fs.rename(path.join(folder, '.gitignore.sample'), path.join(folder, '.gitignore'));
  } catch (e) {
    console.error(e);
    console.error('Unable to copy sampleApp into newly created directory.');
    process.exit(1);
  }
  // display done, npm install to
  console.log('create-mithril-app done.');
  console.log('== to start ==');
  console.log('cd ' + folder);
  console.log('npm install');
  console.log('npm run dev');
}

// console.log(process.argv);
if (process.argv.length < 3) {
  console.log('create-mithril-app <foldername>');
  process.exit(1);
}
main(process.argv[2]);
