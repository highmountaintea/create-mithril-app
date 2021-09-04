#!/usr/bin/env node

const path = require('path');
const unpkg = require('./unpkg');
const { mkdir, readdir, readFile, writeFile, copyDir, saferRename } = require('./fs-promise.js');

const defaultTag = '2021-09';

const validPkgs = {
  'sample-mithril-app': true,
  'sample-mithril-api': true,
};

async function createApp(folder) {
  const pkg = 'sample-mithril-app';
  if (!folder) throw new Error(`missing folder name`);

  try {
    const pkgdir = unpkg.getPkgDir(pkg);
    // if package is not cached, download it
    if (!await unpkg.pkgExists(pkg)) {
      console.log(`${pkg} is not in cache yet, downloading ...`);
      await unpkg.download(pkg, defaultTag);
    }
    // check to ensure folder does not exist or is empty
    try {
      await mkdir(folder);
    } catch (e) {
      try {
        let files = await readdir(folder);
        // console.log(files);
        let invalidFiles = files.filter(f => !['.git', '.gitignore', 'README', 'README.md'].includes(f));
        // console.log(invalidFiles);
        if (invalidFiles.length > 0) throw new Error('directory not empty');
      } catch (e) {
        throw new Error(`Unable to create directory '${folder}'.\ncreate-mithril-app will only proceed if the target directory does not exist or is empty.`);
      }
    }
    // copy sampleApp over
    let failed = await copyDir(pkgdir, folder);
    // console.log(failed);
    let invalidFiles = failed.filter(f => !['.git', '.gitignore', 'README', 'README.md'].includes(f));
    if (invalidFiles.length > 0) {
      console.error('the following files failed to copy over:');
      console.error(invalidFiles);
      throw new Error(`Unable to copy ${pkg} into newly created directory.`);
    }
    let { scripts, dependencies, devDependencies } = JSON.parse(await readFile(path.join(folder, 'package.json')));
    let packageJson = { name: 'sample-mithril-app', version: '0.1.0', scripts, dependencies, devDependencies };
    await writeFile(path.join(folder, 'package.json'), JSON.stringify(packageJson, null, '  '));
    await saferRename(path.join(folder, '.gitignore.sample'), path.join(folder, '.gitignore'));
    //
    console.log('create-mithril-app done.');
    console.log('== to start ==');
    console.log('cd ' + folder);
    console.log('npm install');
    console.log('npm run dev');
  } catch (e) {
    console.error(e);
  }
}

async function createApi(folder) {
  const pkg = 'sample-mithril-api';
  if (!folder) throw new Error(`missing folder name`);

  try {
    const pkgdir = unpkg.getPkgDir(pkg);
    // if package is not cached, download it
    if (!await unpkg.pkgExists(pkg)) {
      console.log(`${pkg} is not in cache yet, downloading ...`);
      await unpkg.download(pkg, defaultTag);
    }
    // check to ensure folder does not exist or is empty
    try {
      await mkdir(folder);
    } catch (e) {
      try {
        let files = await readdir(folder);
        // console.log(files);
        let invalidFiles = files.filter(f => !['.git'].includes(f));
        // console.log(invalidFiles);
        if (invalidFiles.length > 0) throw new Error('directory not empty');
      } catch (e) {
        throw new Error(`Unable to create directory '${folder}'.\ncreate-mithril-app will only proceed if the target directory does not exist or is empty.`);
      }
    }
    // copy sampleApi over
    let failed = await copyDir(pkgdir, folder);
    // console.log(failed);
    let invalidFiles = failed.filter(f => !['.git'].includes(f));
    if (invalidFiles.length > 0) {
      console.error('the following files failed to copy over:');
      console.error(invalidFiles);
      throw new Error(`Unable to copy ${pkg} into newly created directory.`);
    }
    //
    console.log('create-mithril-api done.');
    console.log('== to start ==');
    console.log('cd ' + folder);
    console.log('npm install');
    console.log('npm run start');
  } catch (e) {
    console.error(e);
  }
}

async function downloadPkg(pkg, tag) {
  if (!pkg) throw new Error('missing package name');
  if (!validPkgs[pkg]) throw new Error('Not a valid package');
  if (!tag) tag = defaultTag;
  try {
    await unpkg.download(pkg, tag);
  } catch (e) {
    console.error(e);
  }
}

async function removePkg(pkg) {
  if (!pkg) throw new Error('missing package name');
  if (!validPkgs[pkg]) throw new Error('Not a valid package');
  try {
    await unpkg.remove(pkg);
  } catch (e) {
    console.error(e);
  }
}

function displayHelp() {
  console.log('To create a mithril app skeleton, do the following:');
  console.log('create-mithril-app <foldername>');
  // console.log(' ');
  // console.log('To create a sample backend server, do the following:')
  // console.log('create-mithril-app api <foldername>');
  // console.log(' ');
  // console.log('To download or remove cached packages, do the following:')
  // console.log('create-mithril-app download <sample-mithril-app|sample-mithril-api> <version>');
  // console.log('create-mithril-app rm <sample-mithril-app|sample-mithril-api>');
}

async function processArgv() {
  try {
    let [nodeexe, scriptname, command, arg1, arg2] = process.argv;
    if (command == null) {
      displayHelp();
      return;
    }
    switch (command) {
      case 'app':
        await createApp(arg1);
        break;
      case 'api':
        await createApi(arg1);
        break;
      case 'download':
        await downloadPkg(arg1, arg2);
        break;
      case 'rm': case 'remove':
        await removePkg(arg1);
        break;
      default:
        await createApp(command);
        break;
    }
  } catch (e) {
    console.error('ERROR: ' + e.message);
    console.error(' ');
    displayHelp();
  }
}

processArgv();