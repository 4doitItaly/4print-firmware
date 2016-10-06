import {
   searchReducer
} from './SearchReducers'
import {
   printerReducer
} from './PrinterReducers'

import {
   updaterReducer
} from './UpdaterReducers'

import {
   combineReducers
} from 'redux'

export const reducers = combineReducers({
   search: searchReducer,
   printer: printerReducer,
   updater: updaterReducer
});
