import {createStore,applyMiddleware} from 'redux'
// import logger from 'redux-logger'
import rootReducer from './rootreducer'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store