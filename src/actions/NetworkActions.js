import * as WifiManager from '../api/wifiManager'

export function scan(dispatch) {
  dispatch({type: 'WIFI_SCAN', currentOperationStatus: 'pending', currentOperation: 'wifi-scan'})
  WifiManager.wifiScan((err, networks) => {
    if (err) {
      dispatch({type: 'WIFI_SCAN', currentOperationStatus: 'complete', currentOperation: 'wifi-scan', error: err})
    } else {
      dispatch({type: 'WIFI_SCAN', currentOperationStatus: 'complete', currentOperation: 'wifi-scan', networks: networks})
    }
  })
}

export function connect(network, password, dispatch) {
  dispatch({type: 'WIFI_CONNECT', currentOperationStatus: 'pending', currentOperation: 'wifi-connection'})
  WifiManager.wifiConnect(network.ssid, password, (err, result) => {
    if (err) {
      dispatch({
        type: 'WIFI_CONNECT',
        currentOperationStatus: 'complete',
        currentOperation: 'wifi-connection',
        error: err,
        wifiConnection: {
          connected: false,
          ssid: network.ssid,
          signal_level: network.signal_level
        }
      })
    } else {
      dispatch({
        type: 'WIFI_CONNECT',
        currentOperationStatus: 'complete',
        currentOperation: 'wifi-connection',
        wifiConnection: {
          connected: true,
          ssid: network.ssid,
          signal_level: network.signal_level
        }
      })
    }
  })
}

export function check(dispatch) {
  dispatch({
    type: 'WIFI_CHECK',
    currentOperationStatus: 'pending',
    currentOperation: 'wifi-check',
    wifiConnection: {
      connected: false,
      ssid: '',
      signal_level: -1
    }
  })
  let connection = WifiManager.check()
  if(connection.success) {
    dispatch({
      type: 'WIFI_CHECK',
      currentOperationStatus: 'pending',
      currentOperation: 'wifi-check',
      wifiConnection: {
        connected: connection.connection,
        ssid: connection.ssid,
        signal_level: -1
      }
    })
  } else {
    dispatch({
      type: 'WIFI_CHECK',
      currentOperationStatus: 'pending',
      currentOperation: 'wifi-check',
      error: connection.msg,
      wifiConnection: {
        connected: connection.connection,
        ssid: connection.ssid,
        signal_level: -1
      }
    })
  }
}
