let config = require('../../config')
import {version} from '../../package.json'
import { downloadUpdate, installUpdate, compareSWVersion } from '../api/swUpdater'

let axios = require('axios').create({
  baseURL: `${config.updater.host}:${config.updater.port}/${config.updater.apiUrl}`
})

export function update(dispatch) {
  dispatch({
    type: 'UPDATE',
    status: 'checking',
    operationStatus: 'pending'
  })
  axios.get('update').then(resp => {
    if(compareSWVersion(version, resp.data.version) < 0){
      // installUpdate()

      downloadUpdate(() => {
        console.log('downloadComplete');
        installUpdate()
        dispatch({
          type: 'UPDATE',
          status: 'update',
          operationStatus: 'completed'
        })
      })
    }
  }).catch(err => {
    console.log(err);
    dispatch({
      type: 'UPDATE',
      status: 'update',
      error: err.message,
      operationStatus: 'completed'
    })
  })
}
