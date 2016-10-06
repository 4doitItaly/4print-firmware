const initialState = {
  status: null,
  operationStatus: null
}

export function updaterReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE':
    console.log(action.status);
      return {
        status: action.status,
        operationStatus: action.operationStatus,
        error: action.error || null
      }
    default:
      return state
  }

}
