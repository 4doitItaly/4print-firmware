const initialState = {
  connectionStatus: 'disconnected',
  currentOperation: null,
  currentOperationStatus: null,
  currentPrint: null,
  error: null,
  extra: {},
  results: []
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
        results: action.results || state.results
      }
    case 'PRINT':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        extra: {},
        results: action.results || state.results
      }
    case 'UNPRINT':
      return {
        connectionStatus: state.connectionStatus,
        currentOperation: action.currentOperation,
        currentOperationStatus: action.currentOperationStatus,
        error: action.error || null,
        extra: {},
        results: action.results || state.results
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
        results: action.results || state.results
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
        results: action.results || state.results
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
        }
      }
    default:
      return state
  }
}
