import { combineReducers } from 'redux'

import statsReducer from './stats'


// Add firebase to reducers
const rootReducer = combineReducers({
  characters: statsReducer,
})

export default rootReducer
