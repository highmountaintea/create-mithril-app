const util = require('util');
const path = require('path');
const fs = require('fs');

const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);
const rmdir = util.promisify(fs.rmdir);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const rename = util.promisify(fs.rename);
const copyFile = util.promisify(fs.copyFile);

async function saferRename(src, dest) {
  // returns true if rename successful, otherwise false
  try {
    await access(dest);
    return false;
  } catch(e) {
    await rename(src, dest);
    return true;
  }
}

async function copyDir(srcRoot, destRoot, curPath) {
  let failed = [];
  let srcDir = curPath != null ? path.join(srcRoot, curPath) : srcRoot;
  let destDir = curPath != null ? path.join(destRoot, curPath) : destRoot;
  // console.log(srcDir);
  // try creating destination dir
  // console.log(destDir);
  try {
    await mkdir(destDir);
  } catch (e) {
    // swallow
  }
  let files = await readdir(srcDir, { withFileTypes: true});
  for (let file of files) {
    if (file.isDirectory()) {
      // console.log(`${file.name}: a dir, recurse`);
      failed = failed.concat(await copyDir(srcRoot, destRoot, curPath != null ? `${curPath}/${file.name}` : file.name));
    } else if (file.isFile()) {
      // console.log(`${file.name}: a file, copy`);
      try {
        await copyFile(path.join(srcDir, file.name), path.join(destDir, file.name), fs.constants.COPYFILE_EXCL);
      } catch (e) {
        failed = [...failed, curPath != null ? `${curPath}/${file.name}` : file.name];
      }
    } else {
      // console.log(`${file.name}: neither dir or file`);
      failed = [...failed, curPath != null ? `${curPath}/${file.name}` : file.name];
    }
  }
  return failed;
  // console.log(files);
  // list source dir files
  // loop, copy if file, recurse if directory
  // record and concatenate all failed copies
  // return the list of failed files
  // fsConstants.COPYFILE_EXCL
}

exports.access = access;
exports.mkdir = mkdir;
exports.rmdir = rmdir;
exports.readdir = readdir;
exports.copyFile = copyFile;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.rename = rename;
exports.saferRename = saferRename;
exports.copyDir = copyDir;
