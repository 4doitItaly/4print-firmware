import {
   searchReducer
} from './SearchReducers'
import {
   printerReducer
} from './PrinterReducers'

import {
   combineReducers
} from 'redux'

export const reducers = combineReducers({
   search: searchReducer,
   printer: printerReducer
});
