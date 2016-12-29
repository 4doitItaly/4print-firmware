var http = require('http');
let config = require('../../config')
var fs = require('fs')
var shell = require('shelljs');
var request = require('request')

export function compareSWVersion(s1, s2) {
  let ss1 = s1.split('.')
  let ss2 = s2.split('.')

  let max = ss1.length < ss2.length
    ? ss1.length
    : ss2.length

  for (let i = 0; i < max; i++) {
    if (ss1[i] < ss2[i]) {
      return -1;
    } else if (ss1[i] > ss2[i]) {
      return 1
    }
  }

  if (ss1.length === ss2.length)
    return 0
  else
    return ss1.length < ss2.length
      ? -1
      : 1
  }

export function downloadUpdate(on, cb) {
  var file = fs.createWriteStream(`${config.updater.tempFolder}/${config.updater.filename}.${config.updater.filenameExt}`)
  file.on('finish', function() {
    cb()
  });
let received = 0
let totalLength = 0
let perc = 0
console.log(`${config.updater.host}:${config.updater.port}/${config.updater.apiUrl}/firmware/latest`);
  request({
    method: 'GET',
    uri: `${config.updater.host}:${config.updater.port}/${config.updater.apiUrl}/firmware/latest`
  })
  .on('response', (data) => {
    totalLength = data.headers['content-length']
  })
  .on('data', (chunk) => {
    received += chunk.length
    if(perc != percentage(totalLength, received)){
      perc = percentage(totalLength, received);
      on(perc)
    }
  })
  .on('end', () => {
    cb()
  })
  .pipe(file)
  // http.get(`${config.updater.host}:${config.updater.port}/${config.updater.apiUrl}/firmware/latest`, function(response) {
  //   console.log('downloaded');
  //   response.pipe(file)
  // });
}

function percentage(total, part) {
  return parseInt((100 * part) / total)
}

export function installUpdate(cb) {
  console.log(`unzip -o ${config.updater.tempFolder}/${config.updater.filename}.${config.updater.filenameExt} -d ${config.updater.installFolder}`);
  shell.exec(`unzip -o ${config.updater.tempFolder}/${config.updater.filename}.${config.updater.filenameExt} -d ${config.updater.installFolder}`, () => {
    console.log('installed');
    cb()
  })
}
