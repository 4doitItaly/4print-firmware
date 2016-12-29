let config = require('../../config')
let axios = require('axios').create({
  baseURL: `${config.printer.host}:${config.printer.port}/${config.printer.apiUrl}`,
  headers: {
    'X-Api-Key': `${config.printer.apiKey}`,
    'Content-Type': 'application/json'
  }
})

let connectionSettings = {
  "command": "connect",
  "port": `${config.printer.usbPort}`,
  "baudrate": parseInt(config.printer.baudrate),
  "printerProfile": "_default",
  "autoconnect": false
}
export function connect(dispatch) {
  dispatch({type: 'CONNECT', connectionStatus: 'disconnected', currentOperationStatus: 'pending', currentOperation: 'connection'})
  axios.post('connection', connectionSettings).then(resp => {
    dispatch({type: 'CONNECT', connectionStatus: 'connected', currentOperationStatus: 'complete', currentOperation: 'connection'})
  }).catch(err => {
    dispatch({type: 'CONNECT', connectionStatus: 'disconnected', error: err.message, currentOperationStatus: 'complete', currentOperation: 'connection'})
  })

}

export function print(model, dispatch) {
  dispatch({type: 'PRINT', currentPrint: model, currentOperation: 'printing', currentOperationStatus: 'pending'})
  axios.post(`files/local/${model}`, {
    command: 'select',
    print: true
  }).then(data => {
    dispatch({type: 'PRINT', currentPrint: model, currentOperation: 'printing', currentOperationStatus: 'complete'})
  }).catch(err => {
    dispatch({type: 'PRINT', currentPrint: model, error: err, currentOperation: 'idle', currentOperationStatus: 'complete'})
  })
}

export function unprint(dispatch) {
  dispatch({type: 'UNPRINT', currentOperation: 'unprint', currentOperationStatus: 'pending'})
  let settings = {
    command: 'cancel'
  }
  axios.post('job', settings).then(resp => {
    console.log(resp);
    dispatch({type: 'UNPRINT', currentOperation: 'unprint', currentOperationStatus: 'complete'})
  }).catch(err => {
    dispatch({type: 'UNPRINT', currentOperation: 'idle', error: err.message, currentOperationStatus: 'complete'})
  })

}

export function loadMaterial(dispatch) {
  dispatch({type: 'LOAD_MATERIAL', currentOperation: 'loading_material', currentOperationStatus: 'pending'})
  let settings = {
    commands: ['M104 S210.000000', 'M109 S210.000000', "G91", 'G1 E100 F300', 'M104 S0.000000']
  }

  axios.post('printer/command', settings).then(resp => {
    console.log(resp);
    dispatch({type: 'LOAD_MATERIAL', currentOperation: 'loading_material', currentOperationStatus: 'complete'})
  }).catch(err => {
    dispatch({type: 'LOAD_MATERIAL', currentOperation: 'loading_material', error: err.message, currentOperationStatus: 'complete'})
  })

}
export function unloadMaterial(dispatch) {
  dispatch({type: 'UNLOAD_MATERIAL', currentOperation: 'unloading_material', currentOperationStatus: 'pending'})
  let settings = {
    commands: ['M104 S210.000000', 'M109 S210.000000', "G91", 'G1 E-100 F300', 'M104 S0.000000']
  }
  axios.post('printer/command', settings).then(resp => {
    console.log(resp);
    dispatch({type: 'UNLOAD_MATERIAL', currentOperation: 'unloading_material', currentOperationStatus: 'complete'})
  }).catch(err => {
    dispatch({type: 'UNLOAD_MATERIAL', currentOperation: 'unloading_material', error: err.message, currentOperationStatus: 'complete'})
  })
}

export function autoHome(dispatch) {
  dispatch({type: 'AXES_HOME', currentOperation: 'autohome', currentOperationStatus: 'pending'})
  let settings = {
    command: 'home',
    axes: ['x', 'y', 'z']
  }
  axios.post('printer/printhead', settings).then(resp => {
    console.log(resp);
    dispatch({type: 'AXES_HOME', currentOperation: 'autohome', currentOperationStatus: 'complete'})
  }).catch(err => {
    dispatch({type: 'AXES_HOME', currentOperation: 'autohome', error: err.message, currentOperationStatus: 'complete'})
  })
}
