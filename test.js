let config = require('./config')
var shell = require('shelljs');

shell.exec(`unzip -o ${config.updater.tempFolder}/${config.updater.filename}.${config.updater.filenameExt} -d ${config.updater.installFolder}`)
