const initialState = {
  results: []
}

export function searchReducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH':
      return {
        results: action.results
      }
    default:
      return state
  }

}
