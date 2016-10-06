var http = require('http');
var fs = require('fs')
let config = require('../../config');

var Datastore = require('nedb'),
  db = new Datastore({filename: `${config.folders.resources}/files.db`, autoload: true})

let response = [
  {
    _id: '0',
    name: 'ciao',
    gcode: 'ciao.gcode',
    img: 'ciao.png',
    link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
  }, {
    _id: '1',
    name: 'ciao1',
    gcode: 'ciao1.gcode',
    img: 'ciao1.png',
    link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
  }, {
    _id: '2',
    name: 'ciao2',
    gcode: 'ciao2.gcode',
    img: 'ciao2.png',
    link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
  }, {
    _id: '3',
    name: 'ciao3',
    gcode: 'ciao3.gcode',
    img: 'ciao3.png',
    link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
  }, {
    _id: '4',
    name: 'ciao4',
    gcode: 'ciao4.gcode',
    img: 'cia4.png',
    link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
  }
]

response.forEach(file => {
  db.insert(file)
})

// let newRecord = {
//   name: 'ciao',
//   gcode: 'ciao.gcode',
//   img: 'ciao.png',
//   link: 'http://silvermusicradio.it/wp-content/uploads/2015/03/Immagine-Articolo-cane-felice.gif'
// }
db.insert(response, (err, newDoc) => {
  if(err) console.log('non inserito');;
})

db.find({name: 'ciao2'}, (err, resp) =>{
  if(err) return
  console.log(resp);
})


db.persistence.compactDatafile()
// var file = fs.createWriteStream(`/home/luca/Progetti/CercaStl/${config.folders.img}/file.gif`)
// var request = http.get("", function(response) {
//
//   response.pipe(file)
// });
