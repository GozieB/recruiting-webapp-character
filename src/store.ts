import { configureStore } from '@reduxjs/toolkit'

import makeRootReducer from './reducers';


export const store = configureStore({reducer: makeRootReducer})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>