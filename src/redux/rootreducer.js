import {combineReducers} from 'redux'
import Reducer from './reducer/reducers'

const rootReducer = combineReducers({
   reducer: Reducer
})

export default rootReducer