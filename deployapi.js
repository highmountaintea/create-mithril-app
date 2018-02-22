#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');

async function main(modulefolder, folder) {
  let sampleFolder = path.join(path.dirname(modulefolder), 'sampleAPI');
  // create folder, error out if already exists
  try {
    await fs.mkdir(folder);
  } catch (e) {
    console.error(e.message);
    console.error('Unable to create directory ' + folder + '. Make sure it does not already exist.');
    process.exit(1);
  }
  // copy sampleAPI over
  try {
    await fs.copy(sampleFolder, folder);
  } catch (e) {
    console.error(e);
    console.error('Unable to copy sampleAPI into newly created directory.');
    process.exit(1);
  }
  // display done, npm install to 
  console.log('create-mithril-app-api done.');
  console.log('== to start ==');
  console.log('cd ' + folder);
  console.log('npm install');
  console.log('npm run dev');  
}

// console.log(process.argv);
main(process.argv[1], process.argv[2]);
