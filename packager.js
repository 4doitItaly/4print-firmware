var packager = require('electron-packager')
var shell = require('shelljs');
var fs = require('fs');

let basePath = 'distributable'
let configfile = 'config.json'
let newconfigPath = 'resources/app'

let options = {
  dir: ".",
  arch: "x64",
  platform: "linux",
  out: basePath,
  overwrite: true,
  ignore: ['4doit', 'packager.js', 'prove.js', 'gulpfile.js']
}

packager(options, function done_callback(err, appPaths) {
  console.log(appPaths);
  console.log(`copy: ${configfile} -> ${appPaths[0]}/${newconfigPath}/${configfile}`);
  // copy(`${basePath}/${configfile}`, `${appPaths[0]}/${newconfigPath}/${configfile}`)
  shell.exec(`cd ${appPaths[0]} && zip -r ${__dirname}/${basePath}/cerca-stl.zip *`, () => {
    console.log('compressed');
    console.log(`cd ${appPaths[0]} && zip -r ${__dirname}/${basePath}/cerca-stl.zip *`);
  })
})

function copy(file, newfile) {
  fs.createReadStream(file).pipe(fs.createWriteStream(newfile));
}
