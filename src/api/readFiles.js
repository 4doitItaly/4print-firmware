let fs = require('fs')
let config = require('../../config')

export function readGcodeAndImage(cb) {

   fs.readdir(config.folders.gcode, (err, filenames) => {
      if (err) {
         console.warn(err);
         return
      }
      let gcodes = []
      filenames.forEach(file => {
         let fileNoExt = file.split('.')[0]
         let name = fileNoExt.replace('_', ' ')
         try {
            var stats = fs.statSync(config.folders.img + '/' + fileNoExt + '.png');
            let gcode = {
               gcode: file,
               img: config.folders.img + '/' + fileNoExt + '.png',
               name: name
            }
            gcodes.push(gcode)
         } catch (err) {
            console.warn(err);
         }
      })
      cb(gcodes)
   })
}
