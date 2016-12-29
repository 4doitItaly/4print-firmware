let config = require('../../config')
import {version} from '../../package.json'
import {downloadUpdate, installUpdate, compareSWVersion} from '../api/swUpdater'
import {updateFiles} from '../api/modelsUpdater'

let axios = require('axios').create({baseURL: `${config.updater.host}:${config.updater.port}/${config.updater.apiUrl}`})

export function update(dispatch) {
  dispatch({type: 'UPDATE', currentOperation: 'update', currentOperationStatus: 'pending'})
  axios.get('update').then(resp => {
    console.log(`${version} -> ${resp.data.version}`);
    if (compareSWVersion(version, resp.data.version) < 0) {
      dispatch({type: 'UPDATE', currentOperation: 'downloading_update', currentOperationStatus: 'pending'})
      downloadUpdate((perc) => {
        dispatch({type: 'UPDATE', currentOperation: 'downloading_update', currentOperationStatus: 'pending', downloaded: perc})
      }, () => {
        console.log('aggiornamento scaricato');
        dispatch({type: 'UPDATE', currentOperation: 'downloading_update', currentOperationStatus: 'complete'})
        dispatch({type: 'UPDATE', currentOperation: 'installing_update', currentOperationStatus: 'pending'})
        installUpdate(() => {
          dispatch({type: 'UPDATE', currentOperation: 'installing_update', currentOperationStatus: 'complete'})
          dispatch({type: 'UPDATE', currentOperation: 'update', currentOperationStatus: 'completed'})
        })
      })
    } else {
      dispatch({type: 'UPDATE', currentOperation: 'update', currentOperationStatus: 'completed'})
    }
  }).catch(err => {
    console.log(err);
    dispatch({type: 'UPDATE', currentOperation: 'update', error: err.message, currentOperationStatus: 'completed'})
  })
}

export function updateGcodes(dispatch) {
  dispatch({
    type: 'UPDATE_FILE_DOWNLOAD',
    currentOperation: 'update_files',
    file: name,
    downloaded: 0,
    total: -1,
    currentOperationStatus: 'pending'
  })
  axios.get(`update/gcodes`).then(gcodes => {
    let index = 0
    updateFiles(gcodes.data, (name, i) => {
      index++;
      dispatch({
        type: 'UPDATE_FILE_DOWNLOAD',
        currentOperation: 'update_files',
        file: name,
        downloaded: index,
        total: gcodes.data.length * 2,
        currentOperationStatus: 'pending'
      })
    }, () => {
      dispatch({type: 'UPDATE_FILE_DOWNLOAD', currentOperation: 'update_files', currentOperationStatus: 'completed'})
    })
  })
}
