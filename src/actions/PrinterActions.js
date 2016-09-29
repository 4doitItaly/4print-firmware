let config = require('../../config')
let axios = require('axios').create({
  baseURL: `${config.printer.host}:${config.printer.port}/${config.printer.apiUrl}`,
  headers: {
    'X-Api-Key': `${config.printer.apiKey}`,
    'Content-Type': 'application/json'
  }
})


export function connect(dispatch) {
  let connectionSettings = {
    "command": "connect",
    "port": `${config.printer.usbPort}`,
    "baudrate": config.printer.baudrate,
    "printerProfile": "_default",
    "autoconnect": false
  }
  dispatch({
    type: 'CONNECT',
    status: 'disconnected',
    operationStatus: 'pending'
  })
  axios.post('connection', connectionSettings).then(resp => {
    console.log(resp);
    dispatch({
      type: 'CONNECT',
      status: 'connected',
      operationStatus: 'completed'
    })
  }).catch(err => {
    dispatch({
      type: 'CONNECT',
      status: 'disconnected',
      error: err.message,
      operationStatus: 'completed'
    })
  })

}


export function print(model, dispatch) {
  dispatch({
    type: 'PRINT',
    model: model,
    status: 'printing',
    operationStatus: 'pending'
  })
  axios.post(`files/local/${model}`, {
    command: 'select',
    print: true
  }).then(data => {
    dispatch({
      type: 'PRINT',
      model: model,
      status: 'printing',
      operationStatus: 'complete'
    })
  }).catch(err => {
    dispatch({
      type: 'PRINT',
      model: model,
      error: err,
      status: 'printing',
      operationStatus: 'complete'
    })
  })
}

export function unprint(dispatch) {
  dispatch({
    type: 'UNPRINT',
    status: 'unprint',
    operationStatus: 'pending'
  })
  let settings = {
    command: 'cancel'
  }
  axios.post('job', settings).then(resp => {
    console.log(resp);
    dispatch({
      type: 'UNPRINT',
      status: 'unprint',
      operationStatus: 'completed'
    })
  }).catch(err => {
    dispatch({
      type: 'UNPRINT',
      status: 'unprint',
      error: err.message,
      operationStatus: 'completed'
    })
  })

}

export function loadMaterial(dispatch) {
  dispatch({
    type: 'LOAD_MATERIAL',
    status: 'loading',
    operationStatus: 'pending'
  })
  let settings = {
    command: 'G1 E100'
  }

  axios.post('printer/command', settings).then(resp => {
    console.log(resp);
    dispatch({
      type: 'LOAD_MATERIAL',
      status: 'loading',
      operationStatus: 'completed'
    })
  }).catch(err => {
    dispatch({
      type: 'LOAD_MATERIAL',
      status: 'loading',
      error: err.message,
      operationStatus: 'completed'
    })
  })

}
export function unloadMaterial(dispatch) {
  dispatch({
    type: 'UNLOAD_MATERIAL',
    status: 'unloading',
    operationStatus: 'pending'
  })
  let settings = {
    command: 'G1 E-550 F1200'
  }
  axios.post('printer/command', settings).then(resp => {
    console.log(resp);
    dispatch({
      type: 'UNLOAD_MATERIAL',
      status: 'unloading',
      operationStatus: 'completed'
    })
  }).catch(err => {
    dispatch({
      type: 'UNLOAD_MATERIAL',
      status: 'unloading',
      error: err.message,
      operationStatus: 'completed'
    })
  })
}
