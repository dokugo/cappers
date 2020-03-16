import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createLogger } from 'redux-logger'
import Thunk, { ThunkMiddleware } from 'redux-thunk'

import { Actions } from './posts/actionTypes'
import rootReducer from './rootReducer'
import { RootState } from './rootReducer'

const logger = createLogger({ collapsed: true })
const thunk = applyMiddleware(Thunk as ThunkMiddleware<RootState, Actions>)

const devEnhancers = [
  applyMiddleware(Thunk as ThunkMiddleware<RootState, Actions>),
  applyMiddleware(logger),
]

const prodStore = createStore(rootReducer, thunk)
const devStore = createStore(rootReducer, composeWithDevTools(...devEnhancers))

const store = process.env.NODE_ENV === 'production' ? prodStore : devStore

export default store
