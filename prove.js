let config = require('./config')
var http = require('http');
var fs = require('fs')

let files = [
  {
    "id": 8,
    "name": "secondo",
    "description": "mamma che culo funziona",
    "gcodePath": "http:\/\/4doit.it\/4print\/upload\/gcodes\/secondo.png",
    "imgPath": "http:\/\/4doit.it\/4print\/upload\/img\/secondo.png"
  }, {
    "id": 10,
    "name": "terzo",
    "description": "elemento di conferma",
    "gcodePath": "http:\/\/4doit.it\/4print\/upload\/gcodes\/terzo.jpg",
    "imgPath": "http:\/\/4doit.it\/4print\/upload\/img\/terzo.jpg"
  }
]

function downloadFileUpdate(path, filename, cb) {
  let fileExt = path.split('.')[path.split('.').length - 1]
  let folder = (fileExt === 'gcode'
    ? config.folders.gcode
    : config.folders.img)
  let file = fs.createWriteStream(`${folder}/${filename.replace(' ', '_')}.${fileExt}`)
  file.on('finish', function() {
    cb()
  });
  http.get(`${path}`, function(response) {
    // console.log(`downloaded: ${filename}`);
    response.pipe(file)
  });
}

function fileUpdate(files, on, cb) {
  let down = []

  files.forEach((gcode, i) => {
    let ps = []
    down.push(new Promise((resolve, reject) => {
      downloadFileUpdate(gcode.gcodePath, gcode.name, () => {
        on(gcode.name + '.gcode', i);
        resolve()
      })
    }))

    down.push(new Promise((resolve, reject) => {
      downloadFileUpdate(gcode.imgPath, gcode.name, () => {
        on(gcode.name + '.img', i);
        resolve()
      })
    }))
  })

  // console.log(down);
  Promise.all(down).then(() => {
    cb()
  }).catch((err) => {
    console.log(err);
  })
}

fileUpdate(files, (name, i) => {
  console.log(`Scaricato: ${name} con indice: ${i}`);
}, () => {
  console.log('completato!');
})
