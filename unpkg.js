const util = require('util');
const path = require('path');
const os =  require('os');
const fs = require('fs');
const fetch = require('node-fetch');
const { access, mkdir, rmdir } = require('./fs-promise.js');

async function hasAccess(dir) {
  try {
    await access(dir);
    return true;
  } catch(e) {
    return false;
  }
}

function getCacheDir() {
  const homedir = os.homedir();
  const cachedir = path.join(homedir, '.create-mithril-app');
  return cachedir;
}

function getPkgDir(pkg) {
  const cachedir = getCacheDir();
  const pkgdir = path.join(cachedir, pkg);
  return pkgdir;
}

async function pkgExists(pkg) {
  const pkgdir = getPkgDir(pkg);
  return await hasAccess(pkgdir);
}

async function listUnpkgDir(url) {
  let response = await fetch(url);
  let json = await response.json();
  return json;
}

async function downloadFile(url, filepath) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(filepath);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

async function downloadRecursive(baseUrl, baseDir, urlpath) {
  let dirinfo = await listUnpkgDir(`${baseUrl}${urlpath}/?meta`);
  let dir = path.join(baseDir, urlpath);
  await mkdir(dir);
  for (let file of dirinfo.files) {
    // console.log(file.path);
    switch (file.type) {
      case 'directory':
        await downloadRecursive(baseUrl, baseDir, file.path);
        break;
      case 'file':
        await downloadFile(`${baseUrl}${file.path}`, path.join(baseDir, file.path));
        break;
      default:
        throw new Error(`unknown file type: ${file.type}`);
    }
  }
}

async function download(pkg, tag) {
  const cachedir = getCacheDir();
  const pkgdir = getPkgDir(pkg);
  // ensure directory exists (make it if not)
  if (!(await hasAccess(cachedir))) {
    console.log(`creating ~/.create-mithril-app directory for caching ...`);
    await mkdir(cachedir);
  }
  // uninstall if sample app already exists
  if (await hasAccess(pkgdir)) {
    console.log(`removing old package ${pkg}`);
    await rmdir(pkgdir, { recursive: true});
  }
  // download based on tag
  // let dirinfo = await listUnpkgDir(`https://unpkg.com/sample-mithril-app@${tag}/?meta`);
  // console.log(dirinfo);
  console.log(`downloading ${pkg}@${tag}`);
  await downloadRecursive(`https://unpkg.com/${pkg}@${tag}`, pkgdir, '/');
  // console.log(path.join(homedir, 'abc'));
  // console.log(path.join(homedir, '/abc'));
}

async function remove(pkg) {
  const pkgdir = getPkgDir(pkg);
  // uninstall if sample app already exists
  if (await hasAccess(pkgdir)) {
    console.log(`removing old package ${pkg}`);
    await rmdir(pkgdir, { recursive: true});
  } else {
    console.error('package does not exist, nothing to remove');
  }
}

exports.getCacheDir = getCacheDir;
exports.getPkgDir = getPkgDir;
exports.pkgExists = pkgExists;
exports.download = download;
exports.remove = remove;