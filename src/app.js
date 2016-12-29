import {reducer} from './reducers/MainReducer'

import {
   createStore
} from 'redux'

console.log(reducer);
export const store = createStore(reducer)
