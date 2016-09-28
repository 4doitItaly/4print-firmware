const initialState = {
  status: 'disconnected',
  operationStatus: 'completed'
}

export function printerReducer(state = initialState, action) {
  switch (action.type) {
    case 'CONNECT':
      return {
        status: action.status,
        operationStatus: action.operationStatus,
        error: action.error || null
      }
    case 'PRINT':
      return {
        status: action.status,
        model: action.model,
        operationStatus: action.operationStatus,
        error: action.error || null
      }
    case 'UNPRINT':
      return {
        status: action.status,
        model: action.model,
        operationStatus: action.operationStatus,
        error: action.error || null
      }
    default:
      return state
  }

}
