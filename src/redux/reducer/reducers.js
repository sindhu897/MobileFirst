import * as type from "./jokeTypes"
import {checkLogin,tasks,editTask} from './actions'

const initialState={
    checkLogin: checkLogin(),
    tasks: tasks(),
    editTask: editTask(),
    jokes : [],
    loading: true,
    error:''
}

const JokeReducer =(state=initialState,action)=>{
    switch(action.type){
        case type.FETCH_JOKES:
            return{
                ...state,
                loading: true
            }
        case type.FETCH_JOKES_SUCCESS:
            return{
                ...state,
                loading: false,
                jokes: action.payload,
                error:''
            }
        case type.FETCH_JOKES_FAILURE:
            return{
                ...state,
                loading: false,
                jokes:[],
                error: action.payload
            }
            default: return state
    }
}

export default JokeReducer