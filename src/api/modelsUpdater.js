var http = require('http');
var fs = require('fs')
let config = require('../../config');

var Datastore = require('nedb'),
  db = new Datastore({filename: `${config.folders.resources}/files.db`, autoload: true})

if (!fs.existsSync(config.folders.gcode)) {
  console.log('creazione della cartella dei gcode');
  fs.mkdirSync(config.folders.gcode);
}
if (!fs.existsSync(config.folders.img)) {
  console.log('creazione della cartella delle immagini');
  fs.mkdirSync(config.folders.img);
}

function isIn(element, array) {
  return array.find(item => item.id === element.id) !== undefined
}

function deleteFile(element) {
  fs.stat(`${element}`, (err, stats) => {
    if (err)
      return console.error(err);

    fs.unlink(`${element}`, err => {
      if (err)
        return console.log(err);
      }
    )
  })
}

function fileFromPath(file) {
  return file.split('/')[file.split('/').length - 1]
}

export function updateFiles(data, on, cb) {
  db.find({}, (err, resp) => {
    if (err) {
      return
    }
    let toAdd = [];
    data.forEach(element => {
      if (!isIn(element, resp)) {
        toAdd.push(element)
        db.insert(element, (err, newDoc) => {
          if (err)
            console.log('non inserito');;
        })
      }
    })
    console.log('Files to download: ' + toAdd.length);
    downloadFiles(toAdd, on, cb)

    let deleted = 0
    resp.forEach(element => {
      if (!isIn(element, data)) {
        console.log('^^^^^^^^^^^^^^^');
        console.log(element);
        deleted++;
        deleteFile(`${config.folders.gcode}/${fileFromPath(element.gcodePath)}`)
        deleteFile(`${config.folders.img}/${fileFromPath(element.imgPath)}`)
        db.remove({
          id: element.id
        }, {}, (err, numRemoved) => {});
      }
    })
    console.log('Files deleted: ' + deleted);

    db.persistence.compactDatafile()
  })

}
// response.forEach(file => {
//   db.insert(file)
// })

// let newRecord = {
//   name: 'ciao',
//   gcode: 'ciao.gcode',
//   img: 'ciao.png',
//   link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
// }
// db.insert(response, (err, newDoc) => {
//   if (err)
//     console.log('non inserito');;
// })
//
// db.find({
//   name: 'ciao2'
// }, (err, resp) => {
//   if (err)
//     return
//   console.log(resp);
// })

// var file = fs.createWriteStream(`/home/luca/Progetti/CercaStl/${config.folders.img}/file.gif`)
// var request = http.get("", function(response) {
//
//   response.pipe(file)
// });

function downloadFiles(files, on, cb) {
  let down = []

  files.forEach((gcode, i) => {
    let ps = []
    down.push(new Promise((resolve, reject) => {
      download(gcode.gcodePath, gcode.name, () => {
        on({name: gcode.name, total: files.length * 2, type: 'gcode'});
        resolve()
      })
    }))

    down.push(new Promise((resolve, reject) => {
      download(gcode.imgPath, gcode.name, () => {
        on({name: gcode.name, total: files.length * 2, type: 'img'});
        resolve()
      })
    }))
  })
  Promise.all(down).then(() => {
    cb()
  }).catch((err) => {
    console.log(err);
  })
}

function download(path, filename, cb) {
  let fileExt = path.split('.')[path.split('.').length - 1]
  let folder = fileExt === 'gcode'
    ? config.folders.gcode
    : config.folders.img
  let file = fs.createWriteStream(`${folder}/${filename.replace(' ', '_')}.${fileExt}`)
  file.on('finish', function() {
    cb()
  });
  http.get(`${path}`, function(response) {
    console.log(`downloaded: ${filename}`);
    response.pipe(file)
  });
}
