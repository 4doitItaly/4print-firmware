const initialState = {
  connectionStatus: 'disconnected',
  currentOperation: null,
  currentOperationStatus: null,
  currentPrint: null,
  error: null,
  extra: {},
  results: [],
  wifiConnection: {
    connected: false,
    ssid: '',
    signal_level: -1
  }
}

export function reducer(state = initialState, action) {
  switch (action.type) {
      /*
  printer reducer
  */
    case 'CONNECT':
      return {
        connectionStatus: action.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        extra: {},
        results: action.results || state.results,
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
    case 'PRINT':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        extra: {},
        results: action.results || state.results,
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
    case 'UNPRINT':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        extra: {},
        results: action.results || state.results,
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
      /*
  search reducer
  */
    case 'SEARCH':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: state.currentOperation,
        currentOperationStatus: state.currentOperationStatus,
        error: action.error || null,
        extra: {},
        results: action.results || state.results,
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
      /*
  updater reducer
  */
    case 'UPDATE':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        extra: {
          downloaded: action.downloaded
        },
        results: action.results || state.results,
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
    case 'UPDATE_FILE_DOWNLOAD':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        results: action.results || state.results,
        extra: {
          file: action.file,
          downloaded: action.downloaded,
          total: action.total
        },
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
      /*
      wifi scanner
      */
    case 'WIFI_SCAN':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        results: state.results,
        extra: {
          networks: action.networks || []
        },
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
    case 'WIFI_CONNECT':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        results: state.results,
        extra: {
          networks: action.networks || []
        },
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
      case 'WIFI_CHECK':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        results: state.results,
        extra: {
          networks: action.networks || []
        },
        wifiConnection: action.wifiConnection || state.wifiConnection
      }
    default:
      return state
  }
}
