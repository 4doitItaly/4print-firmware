var packager = require('electron-packager')
var shell = require('shelljs');
var fs = require('fs');
var config = require('./config')

let basePath = 'distributable'
let configfile = 'config.json'
let newconfigPath = 'resources/app'

let options = {
  dir: ".",
  arch: "armv7l",
  platform: "linux",
  out: basePath,
  overwrite: true,
  ignore: ['4doit', 'packager.js', 'prove.js', 'gulpfile.js']
}

packager(options, function done_callback(err, appPaths) {
  console.log('Copia del file di configurazione di produzione');
  fs.createReadStream(`${basePath}/${configfile}`).pipe(fs.createWriteStream(`${appPaths[0]}/${newconfigPath}/${configfile}`));
  console.log('Compressione dell\'archivio in corso');
  // console.log(`cd ${appPaths[0]} && zip -rq ${__dirname}/${basePath}/${config.updater.filename}.${config.updater.filenameExt} *`);
  shell.exec(`cd ${appPaths[0]} && zip -rq ${__dirname}/${basePath}/${config.updater.filename}.${config.updater.filenameExt} *`, () => {
    console.log('Archivio creato con successo');
  })
})
