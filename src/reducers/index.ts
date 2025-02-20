import { combineReducers } from 'redux'

import gameReducer from './game'


// Add firebase to reducers
const rootReducer = combineReducers({
  game: gameReducer,
})

export default rootReducer
